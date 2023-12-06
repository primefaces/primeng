import { AnimationEvent, animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { Footer, Header, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { FocusTrapModule } from 'primeng/focustrap';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Dialog is a container to display content in an overlay window.
 * @group Components
 */
@Component({
    selector: 'p-dialog',
    template: `
        <div
            *ngIf="maskVisible"
            [class]="maskStyleClass"
            [ngClass]="{
                'p-dialog-mask': true,
                'p-component-overlay p-component-overlay-enter': this.modal,
                'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'
            }"
        >
            <div
                #container
                [ngClass]="{ 'p-dialog p-component': true, 'p-dialog-rtl': rtl, 'p-dialog-draggable': draggable, 'p-dialog-resizable': resizable, 'p-dialog-maximized': maximized }"
                [ngStyle]="style"
                [class]="styleClass"
                *ngIf="visible"
                pFocusTrap
                [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-modal]="true"
            >
                <ng-container *ngIf="headlessTemplate; else notHeadless">
                    <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
                </ng-container>

                <ng-template #notHeadless>
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{ header }}</span>
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" role="button" type="button" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-maximize p-link': true }" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span *ngIf="maximizeIcon && !maximizeIconTemplate && !minimizeIconTemplate" class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                            <ng-container *ngIf="!maximizeIcon">
                                <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                                <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                            </ng-container>
                            <ng-container *ngIf="!maximized">
                                <ng-template *ngTemplateOutlet="maximizeIconTemplate"></ng-template>
                            </ng-container>
                            <ng-container *ngIf="maximized">
                                <ng-template *ngTemplateOutlet="minimizeIconTemplate"></ng-template>
                            </ng-container>
                        </button>
                        <button
                            *ngIf="closable"
                            type="button"
                            [ngClass]="{ 'p-dialog-header-icon p-dialog-header-close p-link': true }"
                            [attr.aria-label]="closeAriaLabel"
                            (click)="close($event)"
                            (keydown.enter)="close($event)"
                            [attr.tabindex]="closeTabindex"
                            pRipple
                        >
                            <ng-container *ngIf="!closeIconTemplate">
                                <span *ngIf="closeIcon" class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                                <TimesIcon *ngIf="!closeIcon" [styleClass]="'p-dialog-header-close-icon'" />
                            </ng-container>
                            <span *ngIf="closeIconTemplate">
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
                </ng-template>
            </div>
        </div>
    `,
    animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../dialog/dialog.css'],
    host: {
        class: 'p-element'
    }
})
export class Dialog implements AfterContentInit, OnInit, OnDestroy {
    /**
     * Title text of the dialog.
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    @Input() draggable: boolean = true;
    /**
     * Enables resizing of the content.
     * @group Props
     */
    @Input() resizable: boolean = true;
    /**
     * Defines the left offset of dialog.
     * @group Props
     * @deprecated positionLeft property is deprecated.
     */
    @Input() get positionLeft(): number {
        return 0;
    }
    set positionLeft(_positionLeft: number) {
        console.log('positionLeft property is deprecated.');
    }
    /**
     * Defines the top offset of dialog.
     * @group Props
     * @deprecated positionTop property is deprecated.
     */
    @Input() get positionTop(): number {
        return 0;
    }
    set positionTop(_positionTop: number) {
        console.log('positionTop property is deprecated.');
    }
    /**
     * Style of the content section.
     * @group Props
     */
    @Input() contentStyle: any;
    /**
     * Style class of the content.
     * @group Props
     */
    @Input() contentStyleClass: string | undefined;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    @Input() modal: boolean = false;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    @Input() closeOnEscape: boolean = true;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    @Input() dismissableMask: boolean = false;
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    @Input() rtl: boolean = false;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    @Input() closable: boolean = true;
    /**
     * Defines if the component is responsive.
     * @group Props
     * @deprecated Responsive property is deprecated.
     */
    @Input() get responsive(): boolean {
        return false;
    }
    set responsive(_responsive: boolean) {
        console.log('Responsive property is deprecated.');
    }
    /**
     * Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    @Input() breakpoints: any;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the mask.
     * @group Props
     */
    @Input() maskStyleClass: string | undefined;
    /**
     * Whether to show the header or not.
     * @group Props
     */
    @Input() showHeader: boolean = true;
    /**
     * Defines the breakpoint of the component responsive.
     * @group Props
     * @deprecated Breakpoint property is not utilized and deprecated. Use breakpoints or CSS media queries instead.
     */
    @Input() get breakpoint(): number {
        return 649;
    }
    set breakpoint(_breakpoint: number) {
        console.log('Breakpoint property is not utilized and deprecated, use breakpoints or CSS media queries instead.');
    }
    /**
     * Whether background scroll should be blocked when dialog is visible.
     * @group Props
     */
    @Input() blockScroll: boolean = false;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input() autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input() baseZIndex: number = 0;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     * @group Props
     */
    @Input() minX: number = 0;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @group Props
     */
    @Input() minY: number = 0;
    /**
     * When enabled, first button receives focus on show.
     * @group Props
     */
    @Input() focusOnShow: boolean = true;
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    @Input() maximizable: boolean = false;
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    @Input() keepInViewport: boolean = true;
    /**
     * When enabled, can only focus on elements inside the dialog.
     * @group Props
     */
    @Input() focusTrap: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Name of the close icon.
     * @group Props
     */
    @Input() closeIcon: string | undefined;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    @Input() closeAriaLabel: string | undefined;
    /**
     * Index of the close button in tabbing order.
     * @group Props
     */
    @Input() closeTabindex: string = '-1';
    /**
     * Name of the minimize icon.
     * @group Props
     */
    @Input() minimizeIcon: string | undefined;
    /**
     * Name of the maximize icon.
     * @group Props
     */
    @Input() maximizeIcon: string | undefined;
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;

        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() get style(): any {
        return this._style;
    }
    set style(value: any) {
        if (value) {
            this._style = { ...value };
            this.originalStyle = value;
        }
    }
    /**
     * Position of the dialog.
     * @group Props
     */
    @Input() get position(): 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' {
        return this._position;
    }
    set position(value: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
        this._position = value;

        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
            default:
                this.transformOptions = 'scale(0.7)';
                break;
        }
    }
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
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {boolean} value - New value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Callback to invoke when dialog resizing is initiated.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onResizeInit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when dialog resizing is completed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onResizeEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when dialog dragging is completed.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    @Output() onDragEnd: EventEmitter<DragEvent> = new EventEmitter<DragEvent>();
    /**
     * Callback to invoke when dialog maximized or unmaximized.
     * @group Emits
     */
    @Output() onMaximize: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(Header) headerFacet: QueryList<Header> | undefined;

    @ContentChild(Footer) footerFacet: QueryList<Footer> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('titlebar') headerViewChild: Nullable<ElementRef>;

    @ViewChild('content') contentViewChild: Nullable<ElementRef>;

    @ViewChild('footer') footerViewChild: Nullable<ElementRef>;

    headerTemplate: Nullable<TemplateRef<any>>;

    contentTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    maximizeIconTemplate: Nullable<TemplateRef<any>>;

    closeIconTemplate: Nullable<TemplateRef<any>>;

    minimizeIconTemplate: Nullable<TemplateRef<any>>;

    headlessTemplate: Nullable<TemplateRef<any>>;

    _visible: boolean = false;

    maskVisible: boolean | undefined;

    container: Nullable<HTMLDivElement>;

    wrapper: Nullable<HTMLElement>;

    dragging: boolean | undefined;

    ariaLabelledBy: string | undefined;

    documentDragListener: VoidListener;

    documentDragEndListener: VoidListener;

    resizing: boolean | undefined;

    documentResizeListener: VoidListener;

    documentResizeEndListener: VoidListener;

    documentEscapeListener: VoidListener;

    maskClickListener: VoidListener;

    lastPageX: number | undefined;

    lastPageY: number | undefined;

    preventVisibleChangePropagation: boolean | undefined;

    maximized: boolean | undefined;

    preMaximizeContentHeight: number | undefined;

    preMaximizeContainerWidth: number | undefined;

    preMaximizeContainerHeight: number | undefined;

    preMaximizePageX: number | undefined;

    preMaximizePageY: number | undefined;

    id: string = UniqueComponentId();

    _style: any = {};

    _position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';

    originalStyle: any;

    transformOptions: any = 'scale(0.7)';

    styleElement: any;

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public renderer: Renderer2, public zone: NgZone, private cd: ChangeDetectorRef, public config: PrimeNGConfig) {
        this.window = this.document.defaultView as Window;
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                case 'maximizeicon':
                    this.maximizeIconTemplate = item.template;
                    break;

                case 'minimizeicon':
                    this.minimizeIconTemplate = item.template;
                    break;

                case 'headless':
                    this.headlessTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    ngOnInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }

    getAriaLabelledBy() {
        return this.header !== null ? UniqueComponentId() + '_header' : null;
    }

    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }

    close(event: Event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }

    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }

        if (this.modal) {
            DomHandler.blockBodyScroll();
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }

            if (this.modal) {
                DomHandler.unblockBodyScroll();
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    maximize() {
        this.maximized = !this.maximized;

        if (!this.modal && !this.blockScroll) {
            if (this.maximized) {
                DomHandler.blockBodyScroll();
            } else {
                DomHandler.unblockBodyScroll();
            }
        }

        this.onMaximize.emit({ maximized: this.maximized });
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            (this.wrapper as HTMLElement).style.zIndex = String(parseInt((this.container as HTMLDivElement).style.zIndex, 10) - 1);
        }
    }

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.styleElement = this.renderer.createElement('style');
                this.styleElement.type = 'text/css';
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = '';
                for (let breakpoint in this.breakpoints) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.id}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                }

                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }

    initDrag(event: MouseEvent) {
        if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass((<HTMLElement>event.target).parentElement, 'p-dialog-header-icon')) {
            return;
        }

        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            (this.container as HTMLDivElement).style.margin = '0';
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();

                let focusableElements = DomHandler.getFocusableElements(this.container as HTMLDivElement);

                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    } else {
                        let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();
                            else focusableElements[focusedIndex - 1].focus();
                        } else {
                            if (focusedIndex == -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();
                            else focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            const containerWidth = DomHandler.getOuterWidth(this.container);
            const containerHeight = DomHandler.getOuterHeight(this.container);
            const deltaX = event.pageX - (this.lastPageX as number);
            const deltaY = event.pageY - (this.lastPageY as number);
            const offset = this.container.getBoundingClientRect();

            const containerComputedStyle = getComputedStyle(this.container);

            const leftMargin = parseFloat(containerComputedStyle.marginLeft);
            const topMargin = parseFloat(containerComputedStyle.marginTop);

            const leftPos = offset.left + deltaX - leftMargin;
            const topPos = offset.top + deltaY - topMargin;
            const viewport = DomHandler.getViewport();

            this.container.style.position = 'fixed';

            if (this.keepInViewport) {
                if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
                    this._style.left = `${leftPos}px`;
                    this.lastPageX = event.pageX;
                    this.container.style.left = `${leftPos}px`;
                }

                if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
                    this._style.top = `${topPos}px`;
                    this.lastPageY = event.pageY;
                    this.container.style.top = `${topPos}px`;
                }
            } else {
                this.lastPageX = event.pageX;
                this.container.style.left = `${leftPos}px`;
                this.lastPageY = event.pageY;
                this.container.style.top = `${topPos}px`;
            }
        }
    }

    endDrag(event: DragEvent) {
        if (this.dragging) {
            this.dragging = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }

    resetPosition() {
        (this.container as HTMLDivElement).style.position = '';
        (this.container as HTMLDivElement).style.left = '';
        (this.container as HTMLDivElement).style.top = '';
        (this.container as HTMLDivElement).style.margin = '';
    }

    //backward compatibility
    center() {
        this.resetPosition();
    }

    initResize(event: MouseEvent) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }

    onResize(event: MouseEvent) {
        if (this.resizing) {
            let deltaX = event.pageX - (this.lastPageX as number);
            let deltaY = event.pageY - (this.lastPageY as number);
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild?.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = (this.container as HTMLDivElement).style.minWidth;
            let minHeight = (this.container as HTMLDivElement).style.minHeight;
            let offset = (this.container as HTMLDivElement).getBoundingClientRect();
            let viewport = DomHandler.getViewport();
            let hasBeenDragged = !parseInt((this.container as HTMLDivElement).style.top) || !parseInt((this.container as HTMLDivElement).style.left);

            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }

            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                (this.container as HTMLDivElement).style.width = this._style.width;
            }

            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
                (<ElementRef>this.contentViewChild).nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';

                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    (this.container as HTMLDivElement).style.height = this._style.height;
                }
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    resizeEnd(event: MouseEvent) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.onResizeEnd.emit(event);
        }
    }

    bindGlobalListeners() {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }

        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }

        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }

    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }

    bindDocumentDragListener() {
        if (!this.documentDragListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragListener = this.renderer.listen(this.window, 'mousemove', this.onDrag.bind(this));
            });
        }
    }

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }

    bindDocumentDragEndListener() {
        if (!this.documentDragEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragEndListener = this.renderer.listen(this.window, 'mouseup', this.endDrag.bind(this));
            });
        }
    }

    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragEndListener = null;
        }
    }

    bindDocumentResizeListeners() {
        if (!this.documentResizeListener && !this.documentResizeEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentResizeListener = this.renderer.listen(this.window, 'mousemove', this.onResize.bind(this));
                this.documentResizeEndListener = this.renderer.listen(this.window, 'mouseup', this.resizeEnd.bind(this));
            });
        }
    }

    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                this.close(event);
            }
        });
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.wrapper);
            else DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.wrapper);
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.container?.setAttribute(this.id, '');

                if (this.modal) {
                    this.enableModality();
                }

                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(this.document.body, 'p-overflow-hidden');
                }

                if (this.focusOnShow) {
                    this.focus();
                }
                break;

            case 'void':
                if (this.wrapper && this.modal) {
                    DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                }
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                this.cd.markForCheck();
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;

        this.maskVisible = false;

        if (this.maximized) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
            this.document.body.style.removeProperty('--scrollbar-width');
            this.maximized = false;
        }

        if (this.modal) {
            this.disableModality();
        }

        if (this.blockScroll) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.container = null;
        this.wrapper = null;

        this._style = this.originalStyle ? { ...this.originalStyle } : {};
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }

    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }

        this.destroyStyle();
    }
}

@NgModule({
    imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon],
    exports: [Dialog, SharedModule],
    declarations: [Dialog]
})
export class DialogModule {}
