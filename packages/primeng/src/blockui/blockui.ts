import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, inject, Input, NgModule, numberAttribute, OnDestroy, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { addClass, blockBodyScroll, removeClass, unblockBodyScroll } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ZIndexUtils } from 'primeng/utils';
import { BlockUiStyle } from './style/blockuistyle';

/**
 * BlockUI can either block other components or the whole page.
 * @group Components
 */
@Component({
    selector: 'p-blockUI, p-blockui, p-block-ui',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div
            #mask
            [class]="styleClass"
            [attr.aria-busy]="blocked"
            [ngClass]="{ 'p-blockui-mask-document': !target, 'p-blockui p-blockui-mask p-overlay-mask': true }"
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
    providers: [BlockUiStyle]
})
export class BlockUI extends BaseComponent implements AfterViewInit, OnDestroy {
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
    /**
     * template of the content
     * @group Templates
     */
    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;

    @ViewChild('mask') mask: ElementRef | undefined;

    _blocked: boolean = false;

    animationEndListener: VoidFunction | null | undefined;

    _componentStyle = inject(BlockUiStyle);

    constructor() {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this._blocked) this.block();

        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
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
                blockBodyScroll();
            }

            if (this.autoZIndex) {
                ZIndexUtils.set('modal', (this.mask as ElementRef).nativeElement, this.baseZIndex + this.config.zIndex.modal);
            }
        }
    }

    unblock() {
        if (isPlatformBrowser(this.platformId) && this.mask && !this.animationEndListener) {
            // this.animationEndListener = this.renderer.listen(this.mask.nativeElement, 'animationend', this.destroyModal.bind(this));
            // TODO Add animation
            this.destroyModal();
            addClass(this.mask.nativeElement, 'p-overlay-mask-leave');
        }
    }

    destroyModal() {
        this._blocked = false;
        if (this.mask && isPlatformBrowser(this.platformId)) {
            ZIndexUtils.clear(this.mask.nativeElement);
            removeClass(this.mask.nativeElement, 'p-overlay-mask-leave');
            this.renderer.removeChild(this.el.nativeElement, this.mask.nativeElement);
            unblockBodyScroll();
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
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [BlockUI],
    exports: [BlockUI, SharedModule]
})
export class BlockUIModule {}
