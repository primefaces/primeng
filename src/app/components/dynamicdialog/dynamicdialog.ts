import { animate, animation, AnimationEvent, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, NgModule, NgZone, OnDestroy, Renderer2, Type, ViewChild, ViewEncapsulation, ViewRef } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DynamicDialogContent } from './dynamicdialogcontent';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}', style({ transform: 'none', opacity: 1 }))]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
    selector: 'p-dynamicDialog',
    template: `
        <div
            #mask
            [ngClass]="{
                'p-dialog-mask': true,
                'p-component-overlay p-component-overlay-enter p-dialog-mask-scrollblocker': config.modal !== false,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'
            }"
            [class]="config.maskStyleClass"
        >
            <div
                #container
                [ngClass]="{ 'p-dialog p-dynamic-dialog p-component': true, 'p-dialog-rtl': config.rtl, 'p-dialog-resizable': config.resizable, 'p-dialog-draggable': config.draggable, 'p-dialog-maximized': maximized }"
                [ngStyle]="config.style"
                [class]="config.styleClass"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)' } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                *ngIf="visible"
                [style.width]="config.width"
                [style.height]="config.height"
            >
                <div *ngIf="config.resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="config.showHeader === false ? false : true">
                    <span class="p-dialog-title">{{ config.header }}</span>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="config.maximizable" type="button" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-maximize p-link': true }" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </button>
                        <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="hide()" (keydown.enter)="hide()" *ngIf="config.closable !== false">
                            <span class="p-dialog-header-close-icon pi pi-times"></span>
                        </button>
                    </div>
                </div>
                <div #content class="p-dialog-content" [ngStyle]="config.contentStyle">
                    <ng-template pDynamicDialogContent></ng-template>
                </div>
                <div class="p-dialog-footer" *ngIf="config.footer">
                    {{ config.footer }}
                </div>
            </div>
        </div>
    `,
    animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../dialog/dialog.css'],
    host: {
        class: 'p-element'
    }
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {
    visible: boolean = true;

    componentRef: ComponentRef<any>;

    mask: HTMLDivElement;

    resizing: boolean;

    dragging: boolean;

    maximized: boolean;

    _style: any = {};

    originalStyle: any;

    lastPageX: number;

    lastPageY: number;

    @ViewChild(DynamicDialogContent) insertionPoint: DynamicDialogContent;

    @ViewChild('mask') maskViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    @ViewChild('titlebar') headerViewChild: ElementRef;

    childComponentType: Type<any>;

    container: HTMLDivElement;

    wrapper: HTMLElement;

    documentKeydownListener: any;

    documentEscapeListener: Function;

    maskClickListener: Function;

    transformOptions: string = 'scale(0.7)';

    documentResizeListener: null;

    documentResizeEndListener: null;

    documentDragListener: null;

    documentDragEndListener: null;

    get minX(): number {
        return this.config.minX ? this.config.minX : 0;
    }

    get minY(): number {
        return this.config.minY ? this.config.minY : 0;
    }

    get keepInViewport(): boolean {
        return this.config.keepInViewport;
    }

    get maximizable(): boolean {
        return this.config.maximizable;
    }

    get maximizeIcon(): string {
        return this.config.maximizeIcon ? this.config.maximizeIcon : 'pi pi-window-maximize';
    }

    get minimizeIcon(): string {
        return this.config.minimizeIcon ? this.config.minimizeIcon : 'pi pi-window-minimize';
    }

    get style(): any {
        return this._style;
    }

    get position(): string {
        return this.config.position;
    }

    set style(value: any) {
        if (value) {
            this._style = { ...value };
            this.originalStyle = value;
        }
    }

    get parent() {
        const domElements = Array.from(document.getElementsByClassName('p-dialog'));
        if (domElements.length > 1) {
            return domElements.pop();
        }
    }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef,
        public renderer: Renderer2,
        public config: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef,
        public zone: NgZone,
        public primeNGConfig: PrimeNGConfig
    ) {}

    ngAfterViewInit() {
        this.loadChildComponent(this.childComponentType);
        this.cd.detectChanges();
    }

    loadChildComponent(componentType: Type<any>) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        let viewContainerRef = this.insertionPoint?.viewContainerRef;
        viewContainerRef?.clear();

        this.componentRef = viewContainerRef?.createComponent(componentFactory);
    }

    moveOnTop() {
        if (this.config.autoZIndex !== false) {
            ZIndexUtils.set('modal', this.container, (this.config.baseZIndex || 0) + this.primeNGConfig.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.moveOnTop();
                if (this.parent) {
                    this.unbindGlobalListeners();
                }
                this.bindGlobalListeners();

                if (this.config.modal !== false) {
                    this.enableModality();
                }
                this.focus();
                break;

            case 'void':
                if (this.wrapper && this.config.modal !== false) {
                    DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                }
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        if (event.toState === 'void') {
            this.onContainerDestroy();
            this.dialogRef.destroy();
        }
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();

        if (this.container && this.config.autoZIndex !== false) {
            ZIndexUtils.clear(this.container);
        }

        if (this.config.modal !== false) {
            this.disableModality();
        }
        this.container = null;
    }

    close() {
        this.visible = false;
        this.cd.markForCheck();
    }

    hide() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    enableModality() {
        if (this.config.closable !== false && this.config.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.hide();
                }
            });
        }

        if (this.config.modal !== false) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.config.dismissableMask) {
                this.unbindMaskClickListener();
            }

            if (this.config.modal !== false) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (this.parent) {
            return;
        } else {
            // tab
            if (event.which === 9) {
                event.preventDefault();

                let focusableElements = DomHandler.getFocusableElements(this.container);
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

    focus() {
        const focusable = DomHandler.getFocusableElements(this.container);
        if (focusable && focusable.length > 0) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable[0].focus(), 5);
            });
        }
    }

    maximize() {
        this.maximized = !this.maximized;

        if (this.maximized) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        } else {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        this.dialogRef.maximize({ maximized: this.maximized });
    }

    initResize(event: MouseEvent) {
        if (this.config.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'p-unselectable-text');
            this.dialogRef.resizeInit(event);
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
            let offset = this.container.getBoundingClientRect();
            let viewport = DomHandler.getViewport();
            let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);

            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }

            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }

            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
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

    resizeEnd(event: MouseEvent) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'p-unselectable-text');
            this.dialogRef.resizeEnd(event);
        }
    }

    initDrag(event: MouseEvent) {
        if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass((<HTMLElement>event.target).parentElement, 'p-dialog-header-icon')) {
            return;
        }

        if (this.config.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            this.container.style.margin = '0';
            DomHandler.addClass(document.body, 'p-unselectable-text');
            this.dialogRef.dragStart(event);
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let offset = this.container.getBoundingClientRect();
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();

            this.container.style.position = 'fixed';

            if (this.keepInViewport) {
                if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
                    this._style.left = leftPos + 'px';
                    this.lastPageX = event.pageX;
                    this.container.style.left = leftPos + 'px';
                }

                if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
                    this._style.top = topPos + 'px';
                    this.lastPageY = event.pageY;
                    this.container.style.top = topPos + 'px';
                }
            } else {
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
            this.dialogRef.dragEnd(event);
            this.cd.detectChanges();
        }
    }

    resetPosition() {
        this.container.style.position = '';
        this.container.style.left = '';
        this.container.style.top = '';
        this.container.style.margin = '';
    }

    bindDocumentDragListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
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

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
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

    bindGlobalListeners() {
        this.bindDocumentKeydownListener();

        if (this.config.closeOnEscape !== false && this.config.closable !== false) {
            this.bindDocumentEscapeListener();
        }

        if (this.config.resizable) {
            this.bindDocumentResizeListeners();
        }

        if (this.config.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
    }

    unbindGlobalListeners() {
        this.unbindDocumentKeydownListener();
        this.unbindDocumentEscapeListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
    }

    bindDocumentKeydownListener() {
        this.zone.runOutsideAngular(() => {
            this.documentKeydownListener = this.onKeydown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
        });
    }

    unbindDocumentKeydownListener() {
        if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.maskViewChild ? this.maskViewChild.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) == ZIndexUtils.getCurrent()) {
                    this.hide();
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

    ngOnDestroy() {
        this.onContainerDestroy();

        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [DynamicDialogComponent, DynamicDialogContent],
    entryComponents: [DynamicDialogComponent]
})
export class DynamicDialogModule {}
