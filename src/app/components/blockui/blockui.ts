import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
/**
 * BlockUI can either block other components or the whole page.
 * @group Components
 */
@Component({
    selector: 'p-blockUI',
    template: `
        <div
            #mask
            [class]="styleClass"
            [attr.aria-busy]="blocked"
            [ngClass]="{ 'p-blockui-document': !target, 'p-blockui p-component-overlay p-component-overlay-enter': true }"
            [ngStyle]="{ display: 'none' }"
            [attr.data-pc-name]="'blockui'"
            [attr.data-pc-section]="'root'"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./blockui.css'],
    host: {
        class: 'p-element'
    }
})
export class BlockUI implements AfterViewInit, OnDestroy {
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
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Current blocked state as a boolean.
     * @group Props
     */
    @Input() get blocked(): boolean {
        return this._blocked;
    }
    set blocked(val: boolean) {
        if (this.mask && this.mask.nativeElement) {
            if (val) this.block();
            else this.unblock();
        } else {
            this._blocked = val;
        }
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('mask') mask: ElementRef | undefined;

    _blocked: boolean = false;

    animationEndListener: VoidFunction | null | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        public el: ElementRef,
        public cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) public platformId: any
    ) {}

    ngAfterViewInit() {
        if (this._blocked) this.block();

        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }

    ngAfterContentInit() {
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
            (this.mask as ElementRef).nativeElement.style.display = 'flex';

            if (this.target) {
                this.target.getBlockableElement().appendChild((this.mask as ElementRef).nativeElement);
                this.target.getBlockableElement().style.position = 'relative';
            } else {
                this.renderer.appendChild(this.document.body, (this.mask as ElementRef).nativeElement);
                DomHandler.blockBodyScroll();
            }

            if (this.autoZIndex) {
                ZIndexUtils.set('modal', (this.mask as ElementRef).nativeElement, this.baseZIndex + this.config.zIndex.modal);
            }
        }
    }

    unblock() {
        if (isPlatformBrowser(this.platformId) && this.mask && !this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.mask.nativeElement, 'animationend', this.destroyModal.bind(this));
            DomHandler.addClass(this.mask.nativeElement, 'p-component-overlay-leave');
        }
    }

    destroyModal() {
        this._blocked = false;
        if (this.mask && isPlatformBrowser(this.platformId)) {
            ZIndexUtils.clear(this.mask.nativeElement);
            DomHandler.removeClass(this.mask.nativeElement, 'p-component-overlay-leave');
            this.renderer.removeChild(this.el.nativeElement, this.mask.nativeElement);
            DomHandler.unblockBodyScroll();
        }
        this.unbindAnimationEndListener();
        this.cd.markForCheck();
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    ngOnDestroy() {
        this.unblock();
        this.destroyModal();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [BlockUI],
    declarations: [BlockUI]
})
export class BlockUIModule {}
