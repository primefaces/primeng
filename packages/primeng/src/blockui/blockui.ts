import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    inject,
    InjectionToken,
    Input,
    NgModule,
    numberAttribute,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { addClass, blockBodyScroll, removeClass, unblockBodyScroll } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { BlockUIPassThrough } from 'primeng/types/blockui';
import { ZIndexUtils } from 'primeng/utils';
import { BlockUiStyle } from './style/blockuistyle';

const BLOCKUI_INSTANCE = new InjectionToken<BlockUI>('BLOCKUI_INSTANCE');

/**
 * BlockUI can either block other components or the whole page.
 * @group Components
 */
@Component({
    selector: 'p-blockUI, p-blockui, p-block-ui',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BlockUiStyle, { provide: BLOCKUI_INSTANCE, useExisting: BlockUI }, { provide: PARENT_INSTANCE, useExisting: BlockUI }],
    host: {
        '[attr.aria-busy]': 'blocked',
        '[class]': "cn(cx('root'), styleClass)"
    },
    hostDirectives: [Bind]
})
export class BlockUI extends BaseComponent<BlockUIPassThrough> {
    $pcBlockUI: BlockUI | undefined = inject(BLOCKUI_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Name of the local ng-template variable referring to another component.
     * @group Props
     */
    @Input() target: any;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Current blocked state as a boolean.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) get blocked(): boolean {
        return this._blocked;
    }
    set blocked(val: boolean) {
        if (this.el && this.el.nativeElement) {
            if (val) this.block();
            else this.unblock();
        } else {
            this._blocked = val;
        }
    }
    /**
     * template of the content
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    _blocked: boolean = false;

    animationEndListener: VoidFunction | null | undefined;

    _componentStyle = inject(BlockUiStyle);

    constructor() {
        super();
    }

    onAfterViewInit() {
        if (this._blocked) this.block();

        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }

    _contentTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    onAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    block() {
        if (isPlatformBrowser(this.platformId)) {
            this._blocked = true;
            (this.el as ElementRef).nativeElement.style.display = 'flex';

            if (this.target) {
                this.target.getBlockableElement().appendChild((this.el as ElementRef).nativeElement);
                this.target.getBlockableElement().style.position = 'relative';
            } else {
                this.renderer.appendChild(this.document.body, (this.el as ElementRef).nativeElement);
                //@ts-ignore
                blockBodyScroll();
            }

            if (this.autoZIndex) {
                ZIndexUtils.set('modal', (this.el as ElementRef).nativeElement, this.baseZIndex + this.config.zIndex.modal);
            }
        }
    }

    unblock() {
        if (isPlatformBrowser(this.platformId) && this.el && !this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.el.nativeElement, 'animationend', this.destroyModal.bind(this));
            addClass(this.el.nativeElement, 'p-overlay-mask-leave');
            this.destroyModal();
        }
    }

    destroyModal() {
        this._blocked = false;
        if (this.el && isPlatformBrowser(this.platformId)) {
            ZIndexUtils.clear(this.el.nativeElement);
            removeClass(this.el.nativeElement, 'p-overlay-mask-leave');
            this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement);
            //@ts-ignore
            unblockBodyScroll();
        }
        this.unbindAnimationEndListener();
        this.cd.markForCheck();
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.el) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    onDestroy() {
        this.unblock();
        this.destroyModal();
    }
}

@NgModule({
    imports: [BlockUI, SharedModule],
    exports: [BlockUI, SharedModule]
})
export class BlockUIModule {}
