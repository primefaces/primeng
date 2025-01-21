import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { addClass, appendChild, blockBodyScroll, setAttribute, unblockBodyScroll } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Button, ButtonProps } from 'primeng/button';
import { TimesIcon } from 'primeng/icons';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { DrawerStyle } from './style/drawerstyle';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Sidebar is a panel component displayed as an overlay at the edges of the screen.
 * @group Components
 */
@Component({
    selector: 'p-drawer',
    standalone: true,
    imports: [CommonModule, Button, TimesIcon, SharedModule],
    template: `
        <div
            #container
            [ngClass]="{
                'p-drawer': true,
                'p-drawer-active': visible,
                'p-drawer-left': position === 'left' && !fullScreen,
                'p-drawer-right': position === 'right' && !fullScreen,
                'p-drawer-top': position === 'top' && !fullScreen,
                'p-drawer-bottom': position === 'bottom' && !fullScreen,
                'p-drawer-full': fullScreen || position === 'full'
            }"
            *ngIf="visible"
            [@panelState]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
            (@panelState.start)="onAnimationStart($event)"
            (@panelState.done)="onAnimationEnd($event)"
            [style]="style"
            [class]="styleClass"
            role="complementary"
            [attr.data-pc-name]="'sidebar'"
            [attr.data-pc-section]="'root'"
            (keydown)="onKeyDown($event)"
        >
            @if (headlessTemplate || _headlessTemplate) {
                <ng-container *ngTemplateOutlet="headlessTemplate || _headlessTemplate"></ng-container>
            } @else {
                <div [ngClass]="cx('header')" [attr.data-pc-section]="'header'">
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                    <div *ngIf="header" [class]="cx('title')">{{ header }}</div>
                    <p-button
                        *ngIf="showCloseIcon && closable"
                        [ngClass]="cx('closeButton')"
                        (onClick)="close($event)"
                        (keydown.enter)="close($event)"
                        [buttonProps]="closeButtonProps"
                        [ariaLabel]="ariaCloseLabel"
                        [attr.data-pc-section]="'closebutton'"
                        [attr.data-pc-group-section]="'iconcontainer'"
                    >
                        <ng-template #icon>
                            <TimesIcon *ngIf="!closeIconTemplate && !_closeIconTemplate" [attr.data-pc-section]="'closeicon'" />
                            <ng-template *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-template>
                        </ng-template>
                    </p-button>
                </div>

                <div [ngClass]="cx('content')" [attr.data-pc-section]="'content'">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>

                <ng-container *ngIf="footerTemplate || _footerTemplate">
                    <div [ngClass]="cx('footer')" [attr.data-pc-section]="'footer'">
                        <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                    </div>
                </ng-container>
            }
        </div>
    `,
    animations: [trigger('panelState', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DrawerStyle]
})
export class Drawer extends BaseComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    /**
     *  Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any = 'body';
    /**
     * Whether to block scrolling of the document when drawer is active.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) blockScroll: boolean = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Aria label of the close icon.
     * @group Props
     */
    @Input() ariaCloseLabel: string | undefined;
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
     * Whether an overlay mask is displayed behind the drawer.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) modal: boolean = true;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() closeButtonProps: ButtonProps = { severity: 'secondary', text: true, rounded: true };
    /**
     * Whether to dismiss drawer on click of the mask.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dismissible: boolean = true;
    /**
     * Whether to display the close icon.
     * @group Props
     * @deprecated use 'closable' instead.
     */
    @Input({ transform: booleanAttribute }) showCloseIcon: boolean = true;
    /**
     * Specifies if pressing escape key should hide the drawer.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closeOnEscape: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible as boolean;
    }
    set visible(val: boolean) {
        this._visible = val;
    }
    /**
     * Specifies the position of the drawer, valid values are "left", "right", "bottom" and "top".
     * @group Props
     */
    @Input() get position(): string {
        return this._position;
    }
    set position(value: string) {
        this._position = value;
        if (value === 'full') {
            this.transformOptions = 'none';
            return;
        }
        switch (value) {
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
        }
    }
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    @Input() get fullScreen(): boolean {
        return this._fullScreen;
    }
    set fullScreen(value: boolean) {
        this._fullScreen = value;

        if (value) this.transformOptions = 'none';
    }
    /**
     * Title content of the dialog.
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Style of the mask.
     * @group Props
     */
    @Input() maskStyle: { [klass: string]: any } | null | undefined;
    /**
     * Whether to display close button.
     * @group Props
     * @defaultValue true
     */
    @Input({ transform: booleanAttribute }) closable: boolean = true;
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when dialog visibility is changed.
     * @param {boolean} value - Visible value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('maskRef') maskRef: ElementRef | undefined;

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    @ViewChild('closeButton') closeButtonViewChild: ElementRef | undefined;

    initialized: boolean | undefined;

    _visible: boolean | undefined;

    _position: string = 'left';

    _fullScreen: boolean = false;

    container: Nullable<HTMLDivElement>;

    transformOptions: any = 'translate3d(-100%, 0px, 0px)';

    mask: Nullable<HTMLDivElement>;

    maskClickListener: VoidListener;

    documentEscapeListener: VoidListener;

    animationEndListener: VoidListener;

    _componentStyle = inject(DrawerStyle);

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initialized = true;
    }
    /**
     * Content template for the content of the drawer.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;
    /**
     * Header template for the header of the drawer.
     * @group Templates
     */
    @ContentChild('footer', { descendants: false }) footerTemplate: TemplateRef<any> | undefined;
    /**
     * Content template for the footer of the drawer.
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;
    /**
     * Close icon template for the close icon of the drawer.
     * @group Templates
     */
    @ContentChild('closeicon', { descendants: false }) closeIconTemplate: TemplateRef<any> | undefined;
    /**
     * Headless template for the headless drawer.
     * @group Templates
     */
    @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateRef<any> | undefined;

    _headerTemplate: TemplateRef<any> | undefined;

    _footerTemplate: TemplateRef<any> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    _closeIconTemplate: TemplateRef<any> | undefined;

    _headlessTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;
                case 'header':
                    this._headerTemplate = item.template;
                    break;
                case 'footer':
                    this._footerTemplate = item.template;
                    break;
                case 'closeicon':
                    this._closeIconTemplate = item.template;
                    break;
                case 'headless':
                    this._headlessTemplate = item.template;
                    break;

                default:
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'Escape') {
            this.hide(false);
        }
    }

    show() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex || this.config.zIndex.modal);
        }

        if (this.modal) {
            this.enableModality();
        }

        this.onShow.emit({});
        this.visibleChange.emit(true);
    }

    hide(emit: boolean = true) {
        if (emit) {
            this.onHide.emit({});
        }

        if (this.modal) {
            this.disableModality();
        }
    }

    close(event: Event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }

    enableModality() {
        const activeDrawers = this.document.querySelectorAll('.p-drawer-active');
        const activeDrawersLength = activeDrawers.length;
        const zIndex = activeDrawersLength == 1 ? String(parseInt((this.container as HTMLDivElement).style.zIndex) - 1) : String(parseInt((activeDrawers[activeDrawersLength - 1] as HTMLElement).style.zIndex) - 1);
        this.container.setAttribute(this.attrSelector, '');

        if (!this.mask) {
            this.mask = this.renderer.createElement('div');
            this.renderer.setStyle(this.mask, 'zIndex', zIndex);
            setAttribute(this.mask, 'style', this.maskStyle);
            addClass(this.mask, 'p-overlay-mask p-drawer-mask p-overlay-mask-enter');

            if (this.dismissible) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
                    if (this.dismissible) {
                        this.close(event);
                    }
                });
            }

            this.renderer.appendChild(this.document.body, this.mask);
            if (this.blockScroll) {
                blockBodyScroll();
            }
        }
    }

    disableModality() {
        if (this.mask) {
            addClass(this.mask, 'p-overlay-mask-leave');
            this.animationEndListener = this.renderer.listen(this.mask, 'animationend', this.destroyModal.bind(this));
        }
    }

    destroyModal() {
        this.unbindMaskClickListener();

        if (this.mask) {
            this.renderer.removeChild(this.document.body, this.mask);
        }

        if (this.blockScroll) {
            unblockBodyScroll();
        }

        this.unbindAnimationEndListener();
        this.mask = null;
    }

    onAnimationStart(event: any) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.appendContainer();
                this.show();

                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
        }
    }

    onAnimationEnd(event: any) {
        switch (event.toState) {
            case 'void':
                this.hide(false);
                ZIndexUtils.clear(this.container);
                this.unbindGlobalListeners();
                break;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.container);
            else appendChild(this.appendTo, this.container);
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt((this.container as HTMLDivElement).style.zIndex) === ZIndexUtils.get(this.container)) {
                    this.close(event);
                }
            }
        });
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    unbindGlobalListeners() {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    ngOnDestroy() {
        this.initialized = false;

        if (this.visible && this.modal) {
            this.destroyModal();
        }

        if (this.appendTo && this.container) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.container = null;
        this.unbindGlobalListeners();
        this.unbindAnimationEndListener();
    }
}

@NgModule({
    imports: [Drawer, SharedModule],
    exports: [Drawer, SharedModule]
})
export class DrawerModule {}
