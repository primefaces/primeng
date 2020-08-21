import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,Renderer2,
    ContentChildren,QueryList,ViewChild,NgZone, ChangeDetectorRef,ViewRef,ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, TemplateRef, ContentChild} from '@angular/core';
import {trigger,style,transition,animate, AnimationEvent, animation, useAnimation} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {Header,Footer,SharedModule, PrimeTemplate} from 'primeng/api';
import {FocusTrapModule} from 'primeng/focustrap';
import {RippleModule} from 'primeng/ripple';

let idx: number = 0;

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}')
]);

const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
    selector: 'p-dialog',
    template: `
        <div *ngIf="maskVisible" [class]="maskStyleClass"
            [ngClass]="{'p-dialog-mask': true, 'p-component-overlay': this.modal, 'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'}">
            <div #container [ngClass]="{'p-dialog p-component':true, 'p-dialog-rtl':rtl,'p-dialog-draggable':draggable,'p-dialog-resizable':resizable, 'p-dialog-maximized': maximized}"
                [ngStyle]="style" [class]="styleClass" *ngIf="visible" pFocusTrap [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" [attr.aria-labelledby]="id + '-label'">
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="header">{{header}}</span>
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-maximize p-link':true}" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </button>
                        <button *ngIf="closable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-close p-link':true}" (click)="close($event)" (keydown.enter)="close($event)" tabindex="-1" pRipple>
                            <span class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
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
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
            </div>
        </div>
    `,
    animations: [
        trigger('animation', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ],
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../dialog/dialog.css']
})
export class Dialog implements AfterContentInit,OnDestroy {

    @Input() header: string;

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;

    @Input() get positionLeft(): number {
        return 0;
    };

    set positionLeft(_positionLeft: number) {
        console.log("positionLeft property is deprecated.");
    }

    @Input() get positionTop(): number {
        return 0;
    };

    set positionTop(_positionTop: number) {
        console.log("positionTop property is deprecated.");
    }

    @Input() contentStyle: any;

    @Input() contentStyleClass: string;

    @Input() modal: boolean;

    @Input() closeOnEscape: boolean = true;

    @Input() dismissableMask: boolean;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() get responsive(): boolean {
        return false;
    };

    set responsive(_responsive: boolean) {
        console.log("Responsive property is deprecated.");
    }

    @Input() appendTo: any;

    @Input() styleClass: string;

    @Input() maskStyleClass: string;

    @Input() showHeader: boolean = true;

    @Input() get breakpoint(): number {
        return 649;
    };

    set breakpoint(_breakpoint: number) {
        console.log("Breakpoint property is not utilized and deprecated, use CSS media queries instead.");
    }

    @Input() blockScroll: boolean = false;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() minX: number = 0;

    @Input() minY: number = 0;

    @Input() focusOnShow: boolean = true;

    @Input() maximizable: boolean;

    @Input() keepInViewport: boolean = true;

    @Input() focusTrap: boolean = true;

    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @Input() closeIcon: string = 'pi pi-times';

    @Input() minimizeIcon: string = 'pi pi-window-minimize';

    @Input() maximizeIcon: string = 'pi pi-window-maximize';

    @ContentChild(Header) headerFacet: QueryList<Header>;

    @ContentChild(Footer) footerFacet: QueryList<Footer>;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('titlebar') headerViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    @ViewChild('footer') footerViewChild: ElementRef;

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();

    @Output() onResizeInit: EventEmitter<any> = new EventEmitter();

    @Output() onResizeEnd: EventEmitter<any> = new EventEmitter();

    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

    headerTemplate: TemplateRef<any>;

    contentTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    _visible: boolean;

    maskVisible: boolean;

    container: HTMLDivElement;

    wrapper: HTMLElement;

    dragging: boolean;

    documentDragListener: any;

    documentDragEndListener: any;

    resizing: boolean;

    documentResizeListener: any;

    documentResizeEndListener: any;

    documentEscapeListener: Function;

    maskClickListener: Function;

    lastPageX: number;

    lastPageY: number;

    preventVisibleChangePropagation: boolean;

    maximized: boolean;

    preMaximizeContentHeight: number;

    preMaximizeContainerWidth: number;

    preMaximizeContainerHeight: number;

    preMaximizePageX: number;

    preMaximizePageY: number;

    id: string = `p-dialog-${idx++}`;

    _style: any = {};

    _position: string = "center";

    originalStyle: any;

    transformOptions: any = "scale(0.7)";

    constructor(public el: ElementRef, public renderer: Renderer2, public zone: NgZone, private cd: ChangeDetectorRef) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'content':
                    this.contentTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value:any) {
        this._visible = value;

        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }

    @Input() get style(): any {
        return this._style;
    }
    set style(value:any) {
        if (value) {
            this._style = {...value};
            this.originalStyle = value;
        }
    }

    @Input() get position(): string {
        return this._position;
    };

    set position(value: string) {
        this._position = value;

        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
            break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
            break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
            break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
            break;
            default:
                this.transformOptions = "scale(0.7)";
            break;
        }
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
            this.maskClickListener = this.renderer.listen(this.wrapper, 'click', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }

        if (this.modal) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }

            if (this.modal) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    maximize() {
        this.maximized = !this.maximized;

        if (!this.modal && !this.blockScroll) {
            if (this.maximized)
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            else
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    }

    initDrag(event: MouseEvent) {
        if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass((<HTMLElement> event.target).parentElement, 'p-dialog-header-icon')) {
            return;
        }

        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            this.container.style.margin = '0';
            DomHandler.addClass(document.body, 'p-unselectable-text');
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();

                let focusableElements = DomHandler.getFocusableElements(this.container);

                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let offset = DomHandler.getOffset(this.container);
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();

            this.container.style.position = 'fixed';

            if (this.keepInViewport) {
                if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
                    this._style.left = leftPos + 'px';
                    this.lastPageX = event.pageX;
                    this.container.style.left = leftPos + 'px';
                }

                if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
                    this._style.top = topPos + 'px';
                    this.lastPageY = event.pageY;
                    this.container.style.top = topPos + 'px';
                }
            }
            else {
                this.lastPageX = event.pageX;
                this.container.style.left = leftPos + 'px';
                this.lastPageY = event.pageY;
                this.container.style.top = topPos + 'px';
            }
        }
    }

    endDrag(event: MouseEvent) {
        if (this.dragging) {
            this.dragging = false;
            DomHandler.removeClass(document.body, 'p-unselectable-text');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }

    resetPosition() {
        this.container.style.position = '';
        this.container.style.left = '';
        this.container.style.top = '';
        this.container.style.margin = '';
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
            DomHandler.addClass(document.body, 'p-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }

    onResize(event: MouseEvent) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = DomHandler.getOffset(this.container);
            let viewport = DomHandler.getViewport();
            let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);

            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }

            if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }

            if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
                this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';

                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    this.container.style.height = this._style.height;
                }
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    resizeEnd(event) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'p-unselectable-text');
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
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
    }

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    }

    bindDocumentDragEndListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragEndListener = this.endDrag.bind(this);
            window.document.addEventListener('mouseup', this.documentDragEndListener);
        });
    }

    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    }

    bindDocumentResizeListeners() {
        this.zone.runOutsideAngular(() => {
            this.documentResizeListener = this.onResize.bind(this);
            this.documentResizeEndListener = this.resizeEnd.bind(this);
            window.document.addEventListener('mousemove', this.documentResizeListener);
            window.document.addEventListener('mouseup', this.documentResizeEndListener);
        });
    }

    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mousemove', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
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

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.wrapper);
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.onShow.emit({});
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();

                if (this.modal) {
                    this.enableModality();
                }

                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(document.body, 'p-overflow-hidden');
                }

                if (this.focusOnShow) {
                    this.focus();
                }
            break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch(event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
            break;
        }
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;

        this.maskVisible = false;

        if (this.maximized) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
            this.maximized = false;
        }

        if (this.modal) {
            this.disableModality();
        }

        if (this.blockScroll) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        this.container = null;
        this.wrapper = null;

        this._style = this.originalStyle ? {...this.originalStyle} : {};
    }

    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }

}

@NgModule({
    imports: [CommonModule,FocusTrapModule,RippleModule],
    exports: [Dialog,SharedModule],
    declarations: [Dialog]
})
export class DialogModule { }
