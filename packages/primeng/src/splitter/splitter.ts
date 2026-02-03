import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, effect, ElementRef, forwardRef, inject, InjectionToken, input, NgModule, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { addClass, getHeight, getOuterHeight, getOuterWidth, getWidth, isRTL, removeClass } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import type { SplitterLayout, SplitterPassThrough, SplitterResizeEndEvent, SplitterResizeStartEvent, SplitterStateStorage } from 'primeng/types/splitter';
import { SplitterStyle } from './style/splitterstyle';

const SPLITTER_INSTANCE = new InjectionToken<Splitter>('SPLITTER_INSTANCE');

/**
 * Splitter is utilized to separate and resize panels.
 * @group Components
 */
@Component({
    selector: 'p-splitter',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, BindModule],
    template: `
        @for (panel of panels; track panel; let i = $index) {
            <div [pBind]="ptm('panel')" [class]="cn(cx('panel'), panelStyleClass())" [style]="panelStyle()" tabindex="-1">
                <ng-container *ngTemplateOutlet="panel"></ng-container>
            </div>
            @if (i !== panels.length - 1) {
                <div
                    [pBind]="ptm('gutter')"
                    [class]="cx('gutter')"
                    role="separator"
                    tabindex="-1"
                    (mousedown)="onGutterMouseDown($event, i)"
                    (touchstart)="onGutterTouchStart($event, i)"
                    (touchmove)="onGutterTouchMove($event)"
                    (touchend)="onGutterTouchEnd($event)"
                    [attr.data-p-gutter-resizing]="false"
                    [attr.data-p]="dataP()"
                >
                    <div
                        [pBind]="ptm('gutterHandle')"
                        [class]="cx('gutterHandle')"
                        tabindex="0"
                        [style]="gutterStyle()"
                        [attr.aria-orientation]="layout()"
                        [attr.aria-valuenow]="prevSize"
                        (keyup)="onGutterKeyUp($event)"
                        (keydown)="onGutterKeyDown($event, i)"
                    ></div>
                </div>
            }
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p-gutter-resizing]': 'false',
        '[attr.data-p]': 'dataP()'
    },
    providers: [SplitterStyle, { provide: SPLITTER_INSTANCE, useExisting: Splitter }, { provide: PARENT_INSTANCE, useExisting: Splitter }],
    hostDirectives: [Bind]
})
export class Splitter extends BaseComponent<SplitterPassThrough> {
    componentName = 'Splitter';

    $pcSplitter: Splitter | undefined = inject(SPLITTER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Style class of the panel.
     * @group Props
     */
    panelStyleClass = input<string>();

    /**
     * Inline style of the panel.
     * @group Props
     */
    panelStyle = input<{ [klass: string]: any } | null>();

    /**
     * Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage.
     * @group Props
     */
    stateStorage = input<SplitterStateStorage>('session');

    /**
     * Storage identifier of a stateful Splitter.
     * @group Props
     */
    stateKey = input<string | null>(null);

    /**
     * Orientation of the panels. Valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    layout = input<SplitterLayout>('horizontal');

    /**
     * Size of the divider in pixels.
     * @group Props
     */
    gutterSize = input(4, { transform: numberAttribute });

    /**
     * Step factor to increment/decrement the size of the panels while pressing the arrow keys.
     * @group Props
     */
    step = input(5, { transform: numberAttribute });

    /**
     * Minimum size of the elements relative to 100%.
     * @group Props
     */
    minSizes = input<number[]>([]);

    /**
     * Size of the elements relative to 100%.
     * @group Props
     */
    panelSizes = input<number[]>([]);

    /**
     * Callback to invoke when resize ends.
     * @param {SplitterResizeEndEvent} event - Custom panel resize end event
     * @group Emits
     */
    onResizeEnd = output<SplitterResizeEndEvent>();

    /**
     * Callback to invoke when resize starts.
     * @param {SplitterResizeStartEvent} event - Custom panel resize start event
     * @group Emits
     */
    onResizeStart = output<SplitterResizeStartEvent>();

    panelChildren = contentChildren<TemplateRef<void>>('panel');

    constructor() {
        super();
        effect(() => {
            const sizes = this.panelSizes();
            if (sizes.length === 0 || this.panels.length === 0) return;

            const children = [...this.el.nativeElement.children].filter((child) => child.getAttribute('data-pc-section') === 'panel');
            if (children.length === 0) return;

            this.panels.forEach((_, i) => {
                const panelInitialSize = sizes.length - 1 >= i ? sizes[i] : null;
                const panelSize = panelInitialSize || 100 / this.panels.length;

                this._panelSizes[i] = panelSize;
                if (children[i]) {
                    children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize() + 'px)';
                }
            });
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    splitter = contentChild(forwardRef(() => Splitter));

    nestedState = computed(() => this.splitter());

    panels: TemplateRef<void>[] = [];

    dragging: boolean = false;

    mouseMoveListener: VoidListener;

    mouseUpListener: VoidListener;

    touchMoveListener: VoidListener;

    touchEndListener: VoidListener;

    size: Nullable<number>;

    gutterElement: Nullable<ElementRef | HTMLElement>;

    startPos: Nullable<number>;

    prevPanelElement: Nullable<ElementRef | HTMLElement>;

    nextPanelElement: Nullable<ElementRef | HTMLElement>;

    nextPanelSize: Nullable<number>;

    prevPanelSize: Nullable<number>;

    _panelSizes: number[] = [];

    prevPanelIndex: Nullable<number>;

    timer: ReturnType<typeof setTimeout> | undefined;

    prevSize: string | undefined;

    _componentStyle = inject(SplitterStyle);

    onAfterContentInit() {
        const templates = this.panelChildren();
        if (templates && templates.length > 0) {
            templates.forEach((item) => {
                this.panels.push(item);
            });
        }
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.panels && this.panels.length) {
                let initialized = false;
                if (this.isStateful()) {
                    initialized = this.restoreState();
                }

                if (!initialized) {
                    let children = [...this.el.nativeElement.children].filter((child) => child.getAttribute('data-pc-section') === 'panel');
                    let _panelSizes: number[] = [];
                    const inputPanelSizes = this.panelSizes();

                    this.panels.forEach((_, i) => {
                        let panelInitialSize = inputPanelSizes.length - 1 >= i ? inputPanelSizes[i] : null;
                        let panelSize = panelInitialSize || 100 / this.panels.length;

                        _panelSizes[i] = panelSize;
                        children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize() + 'px)';
                    });

                    this._panelSizes = _panelSizes;

                    this.prevSize = parseFloat(String(_panelSizes[0])).toFixed(4);
                }
            }
        }
    }

    resizeStart(event: TouchEvent | MouseEvent | KeyboardEvent, index: number, isKeyDown?: boolean) {
        this.gutterElement = (event.currentTarget as HTMLElement) || (event.target as HTMLElement).parentElement;
        this.size = this.horizontal() ? getWidth((this.el as ElementRef).nativeElement) : getHeight((this.el as ElementRef).nativeElement);

        if (!isKeyDown) {
            const inputEvent = event as TouchEvent | MouseEvent;
            const isMouseEvent = inputEvent instanceof MouseEvent;
            const pageX = isMouseEvent ? inputEvent.pageX : inputEvent.changedTouches[0].pageX;
            const pageY = isMouseEvent ? inputEvent.pageY : inputEvent.changedTouches[0].pageY;

            this.dragging = true;
            this.startPos = this.horizontal() ? pageX : pageY;
        }

        this.prevPanelElement = this.gutterElement.previousElementSibling as HTMLElement;
        this.nextPanelElement = this.gutterElement.nextElementSibling as HTMLElement;

        if (isKeyDown) {
            this.prevPanelSize = this.horizontal() ? getOuterWidth(this.prevPanelElement, true) : getOuterHeight(this.prevPanelElement, true);
            this.nextPanelSize = this.horizontal() ? getOuterWidth(this.nextPanelElement, true) : getOuterHeight(this.nextPanelElement, true);
        } else {
            this.prevPanelSize = (100 * (this.horizontal() ? getOuterWidth(this.prevPanelElement, true) : getOuterHeight(this.prevPanelElement, true))) / this.size;
            this.nextPanelSize = (100 * (this.horizontal() ? getOuterWidth(this.nextPanelElement, true) : getOuterHeight(this.nextPanelElement, true))) / this.size;
        }

        this.prevPanelIndex = index;
        addClass(this.gutterElement, 'p-splitter-gutter-resizing');
        this.gutterElement.setAttribute('data-p-gutter-resizing', 'true');
        addClass((this.el as ElementRef).nativeElement, 'p-splitter-resizing');
        this.el.nativeElement.setAttribute('data-p-resizing', 'true');
        this.onResizeStart.emit({ originalEvent: event, sizes: this._panelSizes as number[] });
    }

    onResize(event: MouseEvent | TouchEvent | KeyboardEvent, step?: number, isKeyDown?: boolean) {
        let newPos: number | undefined, newPrevPanelSize: number, newNextPanelSize: number;

        if (isKeyDown) {
            if (this.horizontal()) {
                newPrevPanelSize = (100 * ((this.prevPanelSize ?? 0) + (step ?? 0))) / (this.size ?? 1);
                newNextPanelSize = (100 * ((this.nextPanelSize ?? 0) - (step ?? 0))) / (this.size ?? 1);
            } else {
                newPrevPanelSize = (100 * ((this.prevPanelSize ?? 0) - (step ?? 0))) / (this.size ?? 1);
                newNextPanelSize = (100 * ((this.nextPanelSize ?? 0) + (step ?? 0))) / (this.size ?? 1);
            }
        } else {
            const mouseEvent = event as MouseEvent;
            if (this.horizontal()) {
                if (isRTL(this.el.nativeElement)) {
                    newPos = (((this.startPos ?? 0) - mouseEvent.pageX) * 100) / (this.size ?? 1);
                } else {
                    newPos = ((mouseEvent.pageX - (this.startPos ?? 0)) * 100) / (this.size ?? 1);
                }
            } else {
                newPos = ((mouseEvent.pageY - (this.startPos ?? 0)) * 100) / (this.size ?? 1);
            }

            newPrevPanelSize = (this.prevPanelSize as number) + newPos;
            newNextPanelSize = (this.nextPanelSize as number) - newPos;
        }

        this.prevSize = newPrevPanelSize.toFixed(4);

        if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
            (this.prevPanelElement as HTMLElement).style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize() + 'px)';
            (this.nextPanelElement as HTMLElement).style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize() + 'px)';
            this._panelSizes[this.prevPanelIndex as number] = newPrevPanelSize;
            this._panelSizes[(this.prevPanelIndex as number) + 1] = newNextPanelSize;
        }
    }

    resizeEnd(event: MouseEvent | TouchEvent | KeyboardEvent) {
        if (this.isStateful()) {
            this.saveState();
        }

        this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
        removeClass(this.gutterElement as HTMLElement, 'p-splitter-gutter-resizing');
        removeClass((this.el as ElementRef).nativeElement, 'p-splitter-resizing');
        this.clear();
    }

    onGutterMouseDown(event: MouseEvent, index: number) {
        this.resizeStart(event, index);
        this.bindMouseListeners();
    }

    onGutterTouchStart(event: TouchEvent, index: number) {
        if (event.cancelable) {
            this.resizeStart(event, index);
            this.bindTouchListeners();

            event.preventDefault();
        }
    }

    onGutterTouchMove(event: TouchEvent) {
        this.onResize(event);
        event.preventDefault();
    }

    onGutterTouchEnd(event: TouchEvent) {
        this.resizeEnd(event);
        this.unbindTouchListeners();

        if (event.cancelable) event.preventDefault();
    }

    repeat(event: KeyboardEvent, index: number, step: number) {
        this.resizeStart(event, index, true);
        this.onResize(event, step, true);
    }

    setTimer(event: KeyboardEvent, index: number, step: number) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, index, step);
        }, 40);
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    onGutterKeyUp(event: KeyboardEvent) {
        this.clearTimer();
        this.resizeEnd(event);
    }

    onGutterKeyDown(event: KeyboardEvent, index: number) {
        switch (event.code) {
            case 'ArrowLeft': {
                if (this.layout() === 'horizontal') {
                    this.setTimer(event, index, this.step() * -1);
                }

                event.preventDefault();
                break;
            }

            case 'ArrowRight': {
                if (this.layout() === 'horizontal') {
                    this.setTimer(event, index, this.step());
                }

                event.preventDefault();
                break;
            }

            case 'ArrowDown': {
                if (this.layout() === 'vertical') {
                    this.setTimer(event, index, this.step() * -1);
                }

                event.preventDefault();
                break;
            }

            case 'ArrowUp': {
                if (this.layout() === 'vertical') {
                    this.setTimer(event, index, this.step());
                }

                event.preventDefault();
                break;
            }

            default:
                //no op
                break;
        }
    }

    validateResize(newPrevPanelSize: number, newNextPanelSize: number) {
        const minSizes = this.minSizes();
        if (minSizes.length >= 1 && minSizes[0] && minSizes[0] > newPrevPanelSize) {
            return false;
        }

        if (minSizes.length > 1 && minSizes[1] && minSizes[1] > newNextPanelSize) {
            return false;
        }

        return true;
    }

    bindMouseListeners() {
        if (!this.mouseMoveListener) {
            this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event) => {
                this.onResize(event);
            });
        }

        if (!this.mouseUpListener) {
            this.mouseUpListener = this.renderer.listen(this.document, 'mouseup', (event) => {
                this.resizeEnd(event);
                this.unbindMouseListeners();
            });
        }
    }

    bindTouchListeners() {
        if (!this.touchMoveListener) {
            this.touchMoveListener = this.renderer.listen(this.document, 'touchmove', (event) => {
                this.onResize(event.changedTouches[0]);
            });
        }

        if (!this.touchEndListener) {
            this.touchEndListener = this.renderer.listen(this.document, 'touchend', (event) => {
                this.resizeEnd(event);
                this.unbindTouchListeners();
            });
        }
    }

    unbindMouseListeners() {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        }

        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        }
    }

    unbindTouchListeners() {
        if (this.touchMoveListener) {
            this.touchMoveListener();
            this.touchMoveListener = null;
        }

        if (this.touchEndListener) {
            this.touchEndListener();
            this.touchEndListener = null;
        }
    }

    clear() {
        this.dragging = false;
        this.size = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.prevPanelSize = null;
        this.nextPanelSize = null;
        this.gutterElement = null;
        this.prevPanelIndex = null;
    }

    isStateful() {
        return this.stateKey() != null;
    }

    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage()) {
                case 'local':
                    return this.document.defaultView?.localStorage;

                case 'session':
                    return this.document.defaultView?.sessionStorage;

                default:
                    throw new Error(this.stateStorage() + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        } else {
            throw new Error('Storage is not a available by default on the server.');
        }
    }

    saveState() {
        this.getStorage()?.setItem(this.stateKey()!, JSON.stringify(this._panelSizes));
    }

    restoreState() {
        const storage = this.getStorage();
        const stateString = storage?.getItem(this.stateKey()!);

        if (stateString) {
            this._panelSizes = JSON.parse(stateString);
            let children = [...(this.el as ElementRef).nativeElement.children].filter((child) => child.getAttribute('data-pc-section') === 'panel');
            children.forEach((child, i) => {
                child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize() + 'px)';
            });

            return true;
        }

        return false;
    }

    gutterStyle() {
        if (this.horizontal()) return { width: this.gutterSize() + 'px' };
        else return { height: this.gutterSize() + 'px' };
    }

    horizontal() {
        return this.layout() === 'horizontal';
    }

    dataP = computed(() => {
        return this.cn({
            [this.layout()!]: this.layout(),
            nested: this.nestedState() != null
        });
    });
}

@NgModule({
    imports: [Splitter, SharedModule, BindModule],
    exports: [Splitter, SharedModule, BindModule]
})
export class SplitterModule {}
