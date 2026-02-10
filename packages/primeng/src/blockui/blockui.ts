import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChild, effect, inject, InjectionToken, input, NgModule, numberAttribute, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { blockBodyScroll, unblockBodyScroll } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { BlockUIPassThrough } from 'primeng/types/blockui';
import { ZIndexUtils } from 'primeng/utils';
import { BlockUiStyle } from './style/blockuistyle';

const BLOCKUI_INSTANCE = new InjectionToken<BlockUI>('BLOCKUI_INSTANCE');

/**
 * BlockUI can either block other components or the whole page.
 * @group Components
 */
@Component({
    selector: 'p-blockui, p-block-ui',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule],
    template: `
        <ng-content></ng-content>
        @if (contentTemplate()) {
            <ng-container [ngTemplateOutlet]="contentTemplate()"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BlockUiStyle, { provide: BLOCKUI_INSTANCE, useExisting: BlockUI }, { provide: PARENT_INSTANCE, useExisting: BlockUI }],
    host: {
        '[attr.aria-busy]': '_blocked()',
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class BlockUI extends BaseComponent<BlockUIPassThrough> {
    componentName = 'BlockUI';

    $pcBlockUI: BlockUI | undefined = inject(BLOCKUI_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Name of the local ng-template variable referring to another component.
     * @group Props
     */
    target = input<any>();

    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });

    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });

    /**
     * Current blocked state as a boolean.
     * @group Props
     */
    blocked = input(false, { transform: booleanAttribute });

    /**
     * Template of the content.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<any>>('content', { descendants: false });

    _blocked = signal(false);

    animationEndListener: VoidFunction | null | undefined;

    _componentStyle = inject(BlockUiStyle);

    constructor() {
        super();

        effect(() => {
            const blocked = this.blocked();
            if (this.el?.nativeElement) {
                if (blocked) {
                    this.block();
                } else if (this._blocked()) {
                    this.unblock();
                }
            } else {
                this._blocked.set(blocked);
            }
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onAfterViewInit() {
        if (this._blocked()) this.block();

        const target = this.target();
        if (target && !target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }

    block() {
        if (isPlatformBrowser(this.platformId)) {
            this._blocked.set(true);
            this.el.nativeElement.style.display = 'flex';

            const target = this.target();
            if (target) {
                target.getBlockableElement().appendChild(this.el.nativeElement);
                target.getBlockableElement().style.position = 'relative';
            } else {
                this.renderer.appendChild(this.document.body, this.el.nativeElement);
                //@ts-ignore
                blockBodyScroll();
            }

            if (this.autoZIndex()) {
                ZIndexUtils.set('modal', this.el.nativeElement, this.baseZIndex() + this.config.zIndex.modal);
            }

            if (!this.$unstyled()) {
                this.renderer.addClass(this.el.nativeElement, 'p-overlay-mask');
                this.renderer.addClass(this.el.nativeElement, 'p-overlay-mask-enter-active');
            }
        }
    }

    unblock() {
        if (isPlatformBrowser(this.platformId) && this.el && this._blocked()) {
            this._blocked.set(false);
            if (!this.animationEndListener) {
                this.animationEndListener = this.renderer.listen(this.el.nativeElement, 'animationend', this.destroyModal.bind(this));
            }
            if (!this.$unstyled()) {
                this.renderer.removeClass(this.el.nativeElement, 'p-overlay-mask-enter-active');
                this.renderer.addClass(this.el.nativeElement, 'p-overlay-mask-leave-active');
            }
        }
    }

    destroyModal() {
        this._blocked.set(false);
        if (this.el && isPlatformBrowser(this.platformId)) {
            this.el.nativeElement.style.display = 'none';
            if (!this.$unstyled()) {
                this.renderer.removeClass(this.el.nativeElement, 'p-overlay-mask');
                this.renderer.removeClass(this.el.nativeElement, 'p-overlay-mask-leave-active');
            }
            ZIndexUtils.clear(this.el.nativeElement);

            if (!this.target()) {
                this.document.body.removeChild(this.el.nativeElement);
                //@ts-ignore
                unblockBodyScroll();
            }
        }
        this.unbindAnimationEndListener();
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.el) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    onDestroy() {
        if (this._blocked()) {
            // Skip animation on destroy, just cleanup
            this._blocked.set(false);
            if (this.el && isPlatformBrowser(this.platformId)) {
                ZIndexUtils.clear(this.el.nativeElement);
                if (!this.target()) {
                    //@ts-ignore
                    unblockBodyScroll();
                }
            }
            this.unbindAnimationEndListener();
        }
    }
}

@NgModule({
    imports: [BlockUI, SharedModule],
    exports: [BlockUI, SharedModule]
})
export class BlockUIModule {}
