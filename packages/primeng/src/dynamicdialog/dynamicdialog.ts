import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ComponentRef, inject, InjectionToken, NgModule, signal, Type, viewChild, ViewEncapsulation } from '@angular/core';
import { uuid } from '@primeuix/utils';
import { SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Dialog, DialogPassThrough } from 'primeng/dialog';
import { Nullable } from 'primeng/ts-helpers';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogStyle } from './style/dynamicdialogstyle';

const DYNAMIC_DIALOG_INSTANCE = new InjectionToken<DynamicDialog>('DYNAMIC_DIALOG_INSTANCE');

@Component({
    selector: 'p-dynamicdialog, p-dynamic-dialog',
    standalone: true,
    imports: [NgComponentOutlet, SharedModule, DynamicDialogContent, Dialog, BindModule],
    template: `
        <p-dialog
            [visible]="visible()"
            [header]="header"
            [draggable]="draggable"
            [resizable]="resizable"
            [contentStyle]="contentStyle"
            [modal]="modal"
            [closeOnEscape]="closeOnEscape"
            [dismissableMask]="dismissableMask"
            [rtl]="rtl"
            [closable]="closable"
            [breakpoints]="breakpoints"
            [styleClass]="styleClass"
            [maskStyleClass]="maskStyleClass"
            [showHeader]="showHeader"
            [autoZIndex]="autoZIndex"
            [baseZIndex]="baseZIndex"
            [minX]="minX"
            [minY]="minY"
            [focusOnShow]="focusOnShow"
            [maximizable]="maximizable"
            [keepInViewport]="keepInViewport"
            [focusTrap]="focusTrap"
            [motionOptions]="motionOptions"
            [maskMotionOptions]="maskMotionOptions"
            [closeAriaLabel]="closeAriaLabel"
            [minimizeIcon]="minimizeIcon"
            [maximizeIcon]="maximizeIcon"
            [closeButtonProps]="closeButtonProps"
            [maximizeButtonProps]="maximizeButtonProps"
            [style]="dialogStyle"
            [position]="position"
            (onHide)="onDialogHide()"
            (onMaximize)="onDialogMaximize($event)"
            (onResizeInit)="onDialogResizeInit($event)"
            (onResizeEnd)="onDialogResizeEnd($event)"
            (onDragEnd)="onDialogDragEnd($event)"
            (visibleChange)="onVisibleChange($event)"
            [pt]="ddconfig.pt"
            appendTo="self"
            hostName="DynamicDialog"
            [unstyled]="isUnstyled"
        >
            @if (headerTemplate) {
                <ng-template #header>
                    <ng-container *ngComponentOutlet="headerTemplate"></ng-container>
                </ng-template>
            }
            @if (contentTemplate) {
                <ng-template #content>
                    <ng-container *ngComponentOutlet="contentTemplate"></ng-container>
                </ng-template>
            }
            @if (footerTemplate) {
                <ng-template #footer>
                    <ng-container *ngComponentOutlet="footerTemplate"></ng-container>
                </ng-template>
            }
            @if (closeIconTemplate) {
                <ng-template #closeicon>
                    <ng-container *ngComponentOutlet="closeIconTemplate"></ng-container>
                </ng-template>
            }
            @if (maximizeIconTemplate) {
                <ng-template #maximizeicon>
                    <ng-container *ngComponentOutlet="maximizeIconTemplate"></ng-container>
                </ng-template>
            }
            @if (minimizeIconTemplate) {
                <ng-template #minimizeicon>
                    <ng-container *ngComponentOutlet="minimizeIconTemplate"></ng-container>
                </ng-template>
            }

            @if (!contentTemplate) {
                <ng-template pDynamicDialogContent></ng-template>
            }
            @if (ddconfig.footer && !footerTemplate) {
                <div>{{ ddconfig.footer }}</div>
            }
        </p-dialog>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicDialogStyle, { provide: DYNAMIC_DIALOG_INSTANCE, useExisting: DynamicDialog }, { provide: PARENT_INSTANCE, useExisting: DynamicDialog }],
    hostDirectives: [Bind]
})
export class DynamicDialog extends BaseComponent<DialogPassThrough> {
    componentName = 'Dialog';

    _componentStyle = inject(DynamicDialogStyle);

    $pcDynamicDialog: DynamicDialog | undefined = inject(DYNAMIC_DIALOG_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    ddconfig = inject(DynamicDialogConfig);

    dialogRef = inject(DynamicDialogRef);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    visible = signal<boolean>(true);

    componentRef: Nullable<ComponentRef<object>>;

    id: string = uuid('pn_id_');

    insertionPoint = viewChild(DynamicDialogContent);

    dialog = viewChild(Dialog);

    childComponentType: Nullable<Type<object>>;

    inputValues: NonNullable<DynamicDialogConfig['inputValues']> = {};

    get draggable(): boolean {
        return this.ddconfig.draggable !== false;
    }

    get resizable(): boolean {
        return this.ddconfig.resizable !== false;
    }

    get modal(): boolean {
        return this.ddconfig.modal !== false;
    }

    get closeOnEscape(): boolean {
        return this.ddconfig.closeOnEscape !== false;
    }

    get showHeader(): boolean {
        return this.ddconfig.showHeader !== false;
    }

    get autoZIndex(): boolean {
        return this.ddconfig.autoZIndex !== false;
    }

    get baseZIndex(): number {
        return this.ddconfig.baseZIndex ?? 0;
    }

    get focusOnShow(): boolean {
        return this.ddconfig.focusOnShow !== false;
    }

    get focusTrap(): boolean {
        return this.ddconfig.focusTrap !== false;
    }

    get closeAriaLabel(): string {
        return this.ddconfig.closeAriaLabel ?? this.defaultCloseAriaLabel;
    }

    get rtl(): boolean | undefined {
        return this.ddconfig.rtl;
    }

    get styleClass(): string | undefined {
        return this.ddconfig.styleClass;
    }

    get maskStyleClass(): string | undefined {
        return this.ddconfig.maskStyleClass;
    }

    get dismissableMask(): boolean | undefined {
        return this.ddconfig.dismissableMask;
    }

    get contentStyle() {
        return this.ddconfig.contentStyle;
    }

    get minX(): number {
        return this.ddconfig.minX ?? 0;
    }

    get minY(): number {
        return this.ddconfig.minY ?? 0;
    }

    get keepInViewport(): boolean {
        return this.ddconfig.keepInViewport ?? false;
    }

    get maximizable(): boolean {
        return this.ddconfig.maximizable ?? false;
    }

    get maximizeIcon(): string | undefined {
        return this.ddconfig.maximizeIcon;
    }

    get minimizeIcon(): string | undefined {
        return this.ddconfig.minimizeIcon;
    }

    get closable(): boolean | undefined {
        return this.ddconfig.closable;
    }

    get position() {
        return this.ddconfig.position;
    }

    get defaultCloseAriaLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['close'];
    }

    get breakpoints() {
        return this.ddconfig.breakpoints;
    }

    get footerTemplate(): Type<object> | undefined {
        return this.ddconfig?.templates?.footer;
    }

    get headerTemplate(): Type<object> | undefined {
        return this.ddconfig?.templates?.header;
    }

    get contentTemplate(): Type<object> | undefined {
        return this.ddconfig?.templates?.content;
    }

    get minimizeIconTemplate(): Type<object> | undefined {
        return this.ddconfig?.templates?.minimizeicon;
    }

    get maximizeIconTemplate(): Type<object> | undefined {
        return this.ddconfig?.templates?.maximizeicon;
    }

    get closeIconTemplate(): Type<object> | undefined {
        return this.ddconfig?.templates?.closeicon;
    }

    get dialogStyle(): { [klass: string]: any } {
        return {
            ...(this.ddconfig?.style || {}),
            ...(this.ddconfig?.width && { width: this.ddconfig.width }),
            ...(this.ddconfig?.height && { height: this.ddconfig.height })
        };
    }

    get header(): string | undefined {
        return this.ddconfig.header;
    }

    get data() {
        return this.ddconfig.data;
    }

    get dialogId(): string {
        return this.$attrSelector;
    }

    get isUnstyled(): boolean {
        return this.ddconfig.unstyled || this.$unstyled();
    }

    get motionOptions() {
        return this.ddconfig.motionOptions;
    }

    get maskMotionOptions() {
        return this.ddconfig.maskMotionOptions;
    }

    get closeButtonProps() {
        return { severity: 'secondary', variant: 'text', rounded: true };
    }

    get maximizeButtonProps() {
        return { severity: 'secondary', variant: 'text', rounded: true };
    }

    maximized: boolean | undefined;

    dragging: boolean | undefined;

    resizing: boolean | undefined;

    ariaLabelledBy: string | undefined | null;

    _style: { [klass: string]: any } = {};

    lastPageX: number | undefined;

    lastPageY: number | undefined;

    contentViewChild: HTMLElement | null = null;

    footerViewChild: HTMLElement | null = null;

    headerViewChild: HTMLElement | null = null;

    maskViewChild: HTMLElement | null = null;

    maskClickListener: (() => void) | null = null;

    documentDragListener: (() => void) | null = null;

    documentDragEndListener: (() => void) | null = null;

    documentResizeListener: (() => void) | null = null;

    documentResizeEndListener: (() => void) | null = null;

    documentEscapeListener: (() => void) | null = null;

    constructor() {
        super();
    }

    onVisibleChange(visible: boolean) {
        if (!visible) {
            this.dialogRef.close();
        }
    }

    onAfterViewInit() {
        this.loadChildComponent(this.childComponentType!);
        this.ariaLabelledBy = this.getAriaLabelledBy();
        this.cd.detectChanges();
    }

    getAriaLabelledBy() {
        const { header, showHeader } = this.ddconfig;

        if (header === null || showHeader === false) {
            return null;
        }
        return uuid('pn_id_') + '_header';
    }

    loadChildComponent(componentType: Type<object>) {
        let viewContainerRef = this.insertionPoint()?.viewContainerRef;
        viewContainerRef?.clear();

        this.componentRef = viewContainerRef?.createComponent(componentType);

        if (this.inputValues && this.componentRef) {
            Object.entries(this.inputValues).forEach(([key, value]) => {
                this.componentRef!.setInput(key, value);
            });
        }

        this.dialogRef.onChildComponentLoaded.next(this.componentRef!.instance);
    }

    onDialogHide() {
        this.dialogRef.destroy();
    }

    onDialogMaximize(event: { maximized: boolean | undefined }) {
        this.maximized = event.maximized;
        this.dialogRef.maximize(event);
    }

    onDialogResizeInit(event: MouseEvent) {
        this.resizing = true;
        this.dialogRef.resizeInit(event);
    }

    onDialogResizeEnd(event: MouseEvent) {
        this.resizing = false;
        this.dialogRef.resizeEnd(event);
    }

    onDialogDragEnd(event: DragEvent) {
        this.dragging = false;
        this.dialogRef.dragEnd(event);
    }

    close() {
        this.visible.set(false);
    }

    hide() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    container: HTMLElement | null = null;

    wrapper: HTMLElement | null = null;

    unbindGlobalListeners() {
        this.unbindDocumentEscapeListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();
        if (this.ddconfig.modal) {
            this.disableModality();
        }
        this.container = null;
    }

    bindDocumentDragListener() {
        if (!this.documentDragListener) {
            this.documentDragListener = this.renderer.listen(this.document.defaultView, 'mousemove', (event) => {
                this.onDrag(event);
            });
        }
    }

    bindDocumentDragEndListener() {
        if (!this.documentDragEndListener) {
            this.documentDragEndListener = this.renderer.listen(this.document.defaultView, 'mouseup', (event) => {
                this.endDrag(event);
            });
        }
    }

    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragEndListener = null;
        }
    }

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            if (this.ddconfig.keepInViewport && this.container) {
                this.container.style.position = 'fixed';
            }
        }
    }

    endDrag(event: MouseEvent) {
        if (this.dragging) {
            this.dragging = false;
            this.dialogRef.dragEnd(event as DragEvent);
            this.cd.detectChanges();
        }
    }

    resetPosition() {
        if (this.container) {
            this.container.style.position = '';
            this.container.style.left = '';
            this.container.style.top = '';
            this.container.style.margin = '';
        }
    }

    bindDocumentResizeListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.document.defaultView, 'mousemove', (event) => {
                this.onResize(event);
            });
        }
        if (!this.documentResizeEndListener) {
            this.documentResizeEndListener = this.renderer.listen(this.document.defaultView, 'mouseup', (event) => {
                this.resizeEnd(event);
            });
        }
    }

    unbindDocumentResizeListeners() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
        if (this.documentResizeEndListener) {
            this.documentResizeEndListener();
            this.documentResizeEndListener = null;
        }
    }

    initResize(event: MouseEvent) {
        this.resizing = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        this.dialogRef.resizeInit(event);
    }

    onResize(event: MouseEvent) {
        if (this.resizing) {
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    resizeEnd(event: MouseEvent) {
        if (this.resizing) {
            this.resizing = false;
            this.dialogRef.resizeEnd(event);
        }
    }

    maximize() {
        this.maximized = !this.maximized;
        this.dialogRef.maximize({ maximized: this.maximized });
    }

    enableModality() {
        if (this.ddconfig.dismissableMask && this.wrapper) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: MouseEvent) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target as Node)) {
                    this.hide();
                }
            });
        }
    }

    disableModality() {
        this.unbindMaskClickListener();
        this.cd.detectChanges();
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    bindDocumentEscapeListener() {
        if (this.ddconfig.closeOnEscape) {
            this.documentEscapeListener = this.renderer.listen(this.document, 'keydown', (event: KeyboardEvent) => {
                if (event.key === 'Escape' && this.container) {
                    this.hide();
                }
            });
        }
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    onDestroy() {
        this.onContainerDestroy();
        if (this.componentRef && typeof this.componentRef.destroy === 'function') {
            this.componentRef.destroy();
        }
    }
}

@NgModule({
    imports: [DynamicDialog, SharedModule],
    exports: [DynamicDialog, SharedModule]
})
export class DynamicDialogModule {}
