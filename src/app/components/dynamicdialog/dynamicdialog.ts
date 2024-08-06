import { animate, animation, AnimationEvent, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    inject,
    NgModule,
    NgZone,
    OnDestroy,
    Optional,
    Renderer2,
    SkipSelf,
    Type,
    ViewChild,
    ViewEncapsulation,
    ViewRef,
} from '@angular/core';
import { SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { FocusTrapModule } from 'primeng/focustrap';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { BaseComponent } from 'primeng/basecomponent';
import { DynamicDialogStyle } from './style/dynamicdialogstyle';
import { ButtonModule } from 'primeng/button';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 })),
]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
    selector: 'p-dynamicDialog',
    template: `
        <div #mask [ngClass]="cx('mask')" [ngStyle]="sx('mask')" [class]="ddconfig.maskStyleClass">
            <div
                *ngIf="visible"
                #container
                [ngClass]="cx('root')"
                [ngStyle]="sx('root')"
                [style]="ddconfig.style"
                [class]="ddconfig.styleClass"
                [@animation]="{
                    value: 'visible',
                    params: {
                        transform: transformOptions,
                        transition: ddconfig.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'
                    }
                }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                pFocusTrap
                [pFocusTrapDisabled]="ddconfig.focusTrap === false"
                [style.width]="ddconfig.width"
                [style.height]="ddconfig.height"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-modal]="true"
            >
                <div
                    *ngIf="ddconfig.resizable"
                    [ngClass]="cx('resizeHandle')"
                    style="z-index: 90;"
                    (mousedown)="initResize($event)"
                ></div>
                <div
                    #titlebar
                    [ngClass]="cx('header')"
                    (mousedown)="initDrag($event)"
                    *ngIf="ddconfig.showHeader === false ? false : true"
                >
                    <ng-container *ngComponentOutlet="headerTemplate"></ng-container>
                    <ng-container *ngIf="!headerTemplate">
                        <span [ngClass]="cx('title')" [id]="ariaLabelledBy">{{ ddconfig.header }}</span>
                        <div [ngClass]="cx('headerActions')">
                            <p-button
                                *ngIf="ddconfig.maximizable"
                                [styleClass]="cx('pcMaximizeButton')"
                                (onClick)="maximize()"
                                (keydown.enter)="maximize()"
                                [tabindex]="maximizable ? '0' : '-1'"
                            >
                                <ng-container *ngIf="!maximizeIcon">
                                    <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" />
                                    <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" />
                                </ng-container>
                                <ng-container *ngIf="!maximized">
                                    <ng-template *ngTemplateOutlet="_maximizeIconTemplate"></ng-template>
                                </ng-container>
                                <ng-container *ngIf="maximized">
                                    <ng-template *ngTemplateOutlet="_minimizeIconTemplate"></ng-template>
                                </ng-container>
                            </p-button>
                            <p-button
                                *ngIf="closable"
                                [styleClass]="cx('pcCloseButton')"
                                [ariaLabel]="closeAriaLabel"
                                (onClick)="hide()"
                                (keydown.enter)="hide()"
                                rounded
                                text
                                severity="secondary"
                            >
                                <ng-container *ngIf="!closeIconTemplate">
                                    <TimesIcon />
                                </ng-container>
                                <span *ngIf="closeIconTemplate">
                                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                </span>
                            </p-button>
                        </div>
                    </ng-container>
                </div>
                <div #content [ngClass]="cx('content')" [ngStyle]="ddconfig.contentStyle">
                    <ng-template pDynamicDialogContent *ngIf="!contentTemplate"></ng-template>
                    <ng-container *ngComponentOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer [ngClass]="cx('footer')" *ngIf="ddconfig.footer || footerTemplate">
                    <ng-container *ngIf="!footerTemplate">
                        {{ ddconfig.footer }}
                    </ng-container>
                    <ng-container *ngComponentOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('animation', [
            transition('void => visible', [useAnimation(showAnimation)]),
            transition('visible => void', [useAnimation(hideAnimation)]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicDialogStyle],
})
export class DynamicDialogComponent extends BaseComponent implements AfterViewInit, OnDestroy {
    visible: boolean = true;

    componentRef: Nullable<ComponentRef<any>>;

    mask: Nullable<HTMLDivElement>;

    resizing: boolean | undefined;

    dragging: boolean | undefined;

    maximized: boolean | undefined;

    _style: any = {};

    originalStyle: any;

    lastPageX: number | undefined;

    lastPageY: number | undefined;

    ariaLabelledBy: string | undefined;

    id: string = UniqueComponentId();

    styleElement: any;

    @ViewChild(DynamicDialogContent) insertionPoint: Nullable<DynamicDialogContent>;

    @ViewChild('mask') maskViewChild: Nullable<ElementRef>;

    @ViewChild('content') contentViewChild: Nullable<ElementRef>;

    @ViewChild('footer') footerViewChild: Nullable<ElementRef>;

    @ViewChild('titlebar') headerViewChild: Nullable<ElementRef>;

    childComponentType: Nullable<Type<any>>;

    container: Nullable<HTMLDivElement>;

    wrapper: Nullable<HTMLElement>;

    documentKeydownListener: VoidListener;

    documentEscapeListener: VoidListener;

    maskClickListener: VoidListener;

    transformOptions: string = 'scale(0.7)';

    documentResizeListener: VoidListener;

    documentResizeEndListener: VoidListener;

    documentDragListener: VoidListener;

    documentDragEndListener: VoidListener;

    _componentStyle = inject(DynamicDialogStyle);

    get minX(): number {
        return this.ddconfig.minX ? this.ddconfig.minX : 0;
    }

    get minY(): number {
        return this.ddconfig.minY ? this.ddconfig.minY : 0;
    }

    get keepInViewport(): boolean {
        return this.ddconfig.keepInViewport!;
    }

    get maximizable(): boolean {
        return this.ddconfig.maximizable!;
    }

    get maximizeIcon(): string {
        return this.ddconfig.maximizeIcon!;
    }

    get minimizeIcon(): string {
        return this.ddconfig.minimizeIcon!;
    }

    get closable() {
        return this.ddconfig.closable!;
    }

    get style(): any {
        return this._style;
    }

    get position(): string {
        return this.ddconfig.position!;
    }

    get closeAriaLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['close'];
    }

    set style(value: any) {
        if (value) {
            this._style = { ...value };
            this.originalStyle = value;
        }
    }

    get parent() {
        const domElements = Array.from(this.document.getElementsByClassName('p-dialog'));
        if (domElements.length > 1) {
            return domElements.pop();
        }
    }

    get parentContent() {
        const domElements = Array.from(this.document.getElementsByClassName('p-dialog'));
        if (domElements.length > 0) {
            const contentElements = domElements[domElements.length - 1].querySelector('.p-dialog-content');
            if (contentElements) return Array.isArray(contentElements) ? contentElements[0] : contentElements;
        }
    }

    get header() {
        return this.ddconfig.header;
    }

    get data() {
        return this.ddconfig.data;
    }

    get breakpoints() {
        return this.ddconfig.breakpoints;
    }

    get footerTemplate() {
        return this.ddconfig?.templates?.footer;
    }

    get headerTemplate() {
        return this.ddconfig?.templates?.header;
    }

    get contentTemplate() {
        return this.ddconfig?.templates?.content;
    }

    get minimizeIconTemplate() {
        return this.ddconfig?.templates?.minimizeicon;
    }

    get maximizeIconTemplate() {
        return this.ddconfig?.templates?.maximizeicon;
    }

    get closeIconTemplate() {
        return this.ddconfig?.templates?.closeicon;
    }

    constructor(
        public renderer: Renderer2,
        public ddconfig: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef,
        public zone: NgZone,
        @SkipSelf() @Optional() private parentDialog: DynamicDialogComponent,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.breakpoints) {
            this.createStyle();
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
                DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
            }
        }
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }

    ngAfterViewInit() {
        this.loadChildComponent(this.childComponentType!);
        this.ariaLabelledBy = this.getAriaLabelledBy();
        this.cd.detectChanges();
    }

    getAriaLabelledBy() {
        return this.header !== null ? UniqueComponentId() + '_header' : null;
    }

    loadChildComponent(componentType: Type<any>) {
        let viewContainerRef = this.insertionPoint?.viewContainerRef;
        viewContainerRef?.clear();

        this.componentRef = viewContainerRef?.createComponent(componentType);
        this.dialogRef.onChildComponentLoaded.next(this.componentRef!.instance);
    }

    moveOnTop() {
        if (this.ddconfig.autoZIndex !== false) {
            ZIndexUtils.set('modal', this.container, (this.ddconfig.baseZIndex || 0) + this.config.zIndex.modal);
            (this.wrapper as HTMLElement).style.zIndex = String(
                parseInt((this.container as HTMLDivElement).style.zIndex, 10) - 1,
            );
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = (this.container as HTMLDivElement).parentElement;
                this.moveOnTop();
                if (this.parent) {
                    this.unbindGlobalListeners();
                }
                this.bindGlobalListeners();
                this.container?.setAttribute(this.id, '');

                if (this.ddconfig.modal !== false) {
                    this.enableModality();
                }

                if (this.ddconfig.focusOnShow !== false) {
                    this.focus();
                }
                break;

            case 'void':
                if (this.wrapper && this.ddconfig.modal !== false) {
                    DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                }
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        if (event.toState === 'void') {
            if (this.parentContent) {
                this.focus(this.parentContent);
            }
            this.onContainerDestroy();
            this.dialogRef.destroy();
        }
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();

        if (this.container && this.ddconfig.autoZIndex !== false) {
            ZIndexUtils.clear(this.container);
        }

        if (this.ddconfig.modal !== false) {
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
        if (this.ddconfig.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.hide();
                }
            });
        }

        if (this.ddconfig.modal !== false) {
            DomHandler.addClass(this.document.body, 'p-overflow-hidden');
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.ddconfig.dismissableMask) {
                this.unbindMaskClickListener();
            }

            if (this.ddconfig.modal !== false) {
                DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    focus(focusParentElement = this.contentViewChild.nativeElement) {
        let focusable = DomHandler.getFocusableElement(focusParentElement, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
            return;
        }
        const focusableElement = DomHandler.getFocusableElement(focusParentElement);
        if (focusableElement) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusableElement.focus(), 5);
            });
        } else if (this.footerViewChild) {
            // If the content section is empty try to focus on footer
            this.focus(this.footerViewChild.nativeElement);
        } else if (!focusableElement && this.headerViewChild) {
            this.focus(this.headerViewChild.nativeElement);
        }
    }

    maximize() {
        this.maximized = !this.maximized;

        if (this.maximized) {
            DomHandler.addClass(this.document.body, 'p-overflow-hidden');
        } else {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }

        this.dialogRef.maximize({ maximized: this.maximized });
    }

    initResize(event: MouseEvent) {
        if (this.ddconfig.resizable) {
            if (!this.documentResizeListener) {
                this.bindDocumentResizeListeners();
            }

            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
            this.dialogRef.resizeInit(event);
        }
    }

    onResize(event: MouseEvent) {
        if (this.resizing) {
            let deltaX = event.pageX - (this.lastPageX as number);
            let deltaY = event.pageY - (this.lastPageY as number);
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight((<ElementRef>this.contentViewChild).nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = (this.container as HTMLDivElement).style.minWidth;
            let minHeight = (this.container as HTMLDivElement).style.minHeight;
            let offset = (this.container as HTMLDivElement).getBoundingClientRect();
            let viewport = DomHandler.getViewport();
            let hasBeenDragged =
                !parseInt((this.container as HTMLDivElement).style.top) ||
                !parseInt((this.container as HTMLDivElement).style.left);

            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }

            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                (this.container as HTMLDivElement).style.width = this._style.width;
            }

            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
                (<ElementRef>this.contentViewChild).nativeElement.style.height =
                    contentHeight + newHeight - containerHeight + 'px';

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
            this.dialogRef.resizeEnd(event);
        }
    }

    initDrag(event: MouseEvent) {
        if (
            DomHandler.hasClass(event.target, 'p-dialog-header-icon') ||
            DomHandler.hasClass((<HTMLElement>event.target).parentElement, 'p-dialog-header-icon')
        ) {
            return;
        }

        if (this.ddconfig.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            (this.container as HTMLDivElement).style.margin = '0';
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
            this.dialogRef.dragStart(event);
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - (this.lastPageX as number);
            let deltaY = event.pageY - (this.lastPageY as number);
            let offset = (this.container as HTMLDivElement).getBoundingClientRect();
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();

            (this.container as HTMLDivElement).style.position = 'fixed';

            if (this.keepInViewport) {
                if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
                    this._style.left = leftPos + 'px';
                    this.lastPageX = event.pageX;
                    (this.container as HTMLDivElement).style.left = leftPos + 'px';
                }

                if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
                    this._style.top = topPos + 'px';
                    this.lastPageY = event.pageY;
                    (this.container as HTMLDivElement).style.top = topPos + 'px';
                }
            } else {
                this.lastPageX = event.pageX;
                (this.container as HTMLDivElement).style.left = leftPos + 'px';
                this.lastPageY = event.pageY;
                (this.container as HTMLDivElement).style.top = topPos + 'px';
            }
        }
    }

    endDrag(event: MouseEvent) {
        if (this.dragging) {
            this.dragging = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.dialogRef.dragEnd(event);
            this.cd.detectChanges();
        }
    }

    resetPosition() {
        (this.container as HTMLDivElement).style.position = '';
        (this.container as HTMLDivElement).style.left = '';
        (this.container as HTMLDivElement).style.top = '';
        (this.container as HTMLDivElement).style.margin = '';
    }

    bindDocumentDragListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.documentDragListener = this.renderer.listen(this.document, 'mousemove', this.onDrag.bind(this));
            });
        }
    }

    bindDocumentDragEndListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.documentDragEndListener = this.renderer.listen(this.document, 'mouseup', this.endDrag.bind(this));
            });
        }
    }

    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragListener = null;
        }
    }

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }

    bindDocumentResizeListeners() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.documentResizeListener = this.renderer.listen(
                    this.document,
                    'mousemove',
                    this.onResize.bind(this),
                );
                this.documentResizeEndListener = this.renderer.listen(
                    this.document,
                    'mouseup',
                    this.resizeEnd.bind(this),
                );
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

    bindGlobalListeners() {
        if (this.ddconfig.closeOnEscape !== false) {
            this.bindDocumentEscapeListener();
        }

        if (this.ddconfig.resizable) {
            this.bindDocumentResizeListeners();
        }

        if (this.ddconfig.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
    }

    unbindGlobalListeners() {
        this.unbindDocumentEscapeListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.maskViewChild ? this.maskViewChild.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt((this.container as HTMLDivElement).style.zIndex) == ZIndexUtils.getCurrent()) {
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
        this.destroyStyle();
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [
        CommonModule,
        WindowMaximizeIcon,
        WindowMinimizeIcon,
        TimesIcon,
        ButtonModule,
        SharedModule,
        FocusTrapModule,
    ],
    declarations: [DynamicDialogComponent, DynamicDialogContent],
    exports: [SharedModule],
})
export class DynamicDialogModule {}
