import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { Subscription, startWith } from 'rxjs';
import { SplitterResizeEndEvent, SplitterResizeStartEvent } from './splitter.interface';
/**
 * Splitter is utilized to separate and resize panels.
 * @group Components
 */
@Component({
    selector: 'p-splitter',
    template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.data-pc-name]="'splitter'" [attr.data-p-gutter-resizing]="false" [attr.data-pc-section]="'root'">
            <ng-template ngFor let-panel [ngForOf]="panels" let-i="index">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle" tabindex="-1" [attr.data-pc-name]="'splitter'" [attr.data-pc-section]="'root'">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div
                    *ngIf="i !== panels.length - 1"
                    class="p-splitter-gutter"
                    role="seperator"
                    tabindex="-1"
                    (mousedown)="onGutterMouseDown($event, i)"
                    (touchstart)="onGutterTouchStart($event, i)"
                    (touchmove)="onGutterTouchMove($event)"
                    (touchend)="onGutterTouchEnd($event, i)"
                    [attr.data-p-gutter-resizing]="false"
                    [attr.data-pc-section]="'gutter'"
                >
                    <div
                        class="p-splitter-gutter-handle"
                        tabindex="0"
                        [ngStyle]="gutterStyle()"
                        [attr.aria-orientation]="layout"
                        [attr.aria-valuenow]="prevSize"
                        [attr.data-pc-section]="'gutterhandle'"
                        (keyup)="onGutterKeyUp($event)"
                        (keydown)="onGutterKeyDown($event, i)"
                    ></div>
                </div>
            </ng-template>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./splitter.css'],
    host: {
        class: 'p-element',
        '[class.p-splitter-panel-nested]': 'nested'
    }
})
export class Splitter {
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the panel.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the panel.
     * @group Props
     */
    @Input() panelStyle: { [klass: string]: any } | null | undefined;
    /**
     * Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage.
     * @group Props
     */
    @Input() stateStorage: string | undefined = 'session';
    /**
     * Storage identifier of a stateful Splitter.
     * @group Props
     */
    @Input() stateKey: string | undefined | null = null;
    /**
     * Orientation of the panels. Valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    @Input() layout: string | undefined = 'horizontal';
    /**
     * Size of the divider in pixels.
     * @group Props
     */
    @Input() gutterSize: number = 4;
    /**
     * Step factor to increment/decrement the size of the panels while pressing the arrow keys.
     * @group Props
     */
    @Input() step: number = 5;
    /**
     * Minimum size of the elements relative to 100%.
     * @group Props
     */
    @Input() minSizes: number[] = [];
    /**
     * Whether to keep the proportions of the elements when adding/removing panels.
     * @group Props
     */
    @Input() keepProportions: boolean = false;
    /**
     * Size of the new panels relative to 100%.
     * @group Props
     */
    @Input() newPanelsSize: number = 25;
    /**
     * Size of the elements relative to 100%.
     * @group Props
     */
    @Input() get panelSizes(): number[] {
        return this._panelSizes;
    }
    set panelSizes(val: number[]) {
        this._panelSizes = val;

        if (this.el && this.el.nativeElement && this.panels.length > 0) {
            this.calculatePanelSizes();
        }
    }
    /**
     * Callback to invoke when resize ends.
     * @param {SplitterResizeEndEvent} event - Custom panel resize end event
     * @group Emits
     */
    @Output() onResizeEnd: EventEmitter<SplitterResizeEndEvent> = new EventEmitter<SplitterResizeEndEvent>();
    /**
     * Callback to invoke when resize starts.
     * @param {SplitterResizeStartEvent} event - Custom panel resize start event
     * @group Emits
     */
    @Output() onResizeStart: EventEmitter<SplitterResizeStartEvent> = new EventEmitter<SplitterResizeStartEvent>();

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    @ViewChild('container', { static: false }) containerViewChild: Nullable<ElementRef>;

    nested: boolean = false;

    panels: any[] = [];

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

    timer: any;

    prevSize: any;

    private window: Window;

    templateChangesSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public cd: ChangeDetectorRef, private el: ElementRef) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        this.nested = this.isNested();
    }

    ngAfterContentInit() {
        this.templateChangesSubscription = this.templates.changes.pipe(startWith(null)).subscribe((_) => {
            this.initPanels();
            this.cd.markForCheck();
        });
    }

    ngAfterViewInit() {
        if (this.panels && this.panels.length) {
            let initialized = false;
            if (this.isStateful() && isPlatformBrowser(this.platformId)) {
                initialized = this.restoreState();
            }

            if (!initialized) {
                this.calculatePanelSizes();
            }
        }
    }

    ngAfterViewChecked() {
        if (this.panelSizes.length !== this.panels.length) {
            this.calculatePanelSizes(this.keepProportions, this.newPanelsSize);
        }
    }

    ngOnDestroy() {
        if (this.templateChangesSubscription) {
            this.templateChangesSubscription.unsubscribe();
        }
    }

    initPanels() {
        this.panels = this.templates.reduce((acc, item) => {
            switch (item.getType()) {
                case 'panel':
                    acc.push(item.template);
                    break;
                default:
                    acc.push(item.template);
                    break;
            }
            return acc;
        }, []);
    }

    calculatePanelSizes(keepProportions: boolean = true, newPanelsSize: number = 25) {
        let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));

        let _panelSizes = [];
        let sum = 0;

        // If the panelSizes property is not set, calculate the initial sizes
        this.panels.map((panel, i) => {
            let panelInitialSize = this.panelSizes.length - 1 >= i && keepProportions ? this.panelSizes[i] : null;
            let panelSize = panelInitialSize || newPanelsSize;

            _panelSizes[i] = panelSize;
            sum += panelSize;
        });

        // Make sure the sum of the sizes is 100%
        this._panelSizes = _panelSizes.map((panelSize, i) => {
            let _panelSize = panelSize * (100 / sum);

            children[i].style.flexBasis = 'calc(' + _panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            return _panelSize;
        });

        this.prevSize = parseFloat(_panelSizes[0]).toFixed(4);
    }

    resizeStart(event: TouchEvent | MouseEvent, index: number, isKeyDown?: boolean) {
        this.gutterElement = (event.currentTarget as HTMLElement) || (event.target as HTMLElement).parentElement;
        this.size = this.horizontal() ? DomHandler.getWidth((this.containerViewChild as ElementRef).nativeElement) : DomHandler.getHeight((this.containerViewChild as ElementRef).nativeElement);

        if (!isKeyDown) {
            this.dragging = true;
            this.startPos = this.horizontal() ? (event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX) : event instanceof MouseEvent ? event.pageY : event.changedTouches[0].pageY;
        }

        this.prevPanelElement = this.gutterElement.previousElementSibling as HTMLElement;
        this.nextPanelElement = this.gutterElement.nextElementSibling as HTMLElement;

        if (isKeyDown) {
            this.prevPanelSize = this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true);
            this.nextPanelSize = this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true);
        } else {
            this.prevPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true))) / this.size;
            this.nextPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true))) / this.size;
        }

        this.prevPanelIndex = index;
        DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
        this.gutterElement.setAttribute('data-p-gutter-resizing', 'true');
        DomHandler.addClass((this.containerViewChild as ElementRef).nativeElement, 'p-splitter-resizing');
        this.containerViewChild.nativeElement.setAttribute('data-p-resizing', 'true');
        this.onResizeStart.emit({ originalEvent: event, sizes: this._panelSizes as number[] });
    }

    onResize(event: MouseEvent, step?: number, isKeyDown?: boolean) {
        let newPos, newPrevPanelSize, newNextPanelSize;

        if (isKeyDown) {
            if (this.horizontal()) {
                newPrevPanelSize = (100 * (this.prevPanelSize + step)) / this.size;
                newNextPanelSize = (100 * (this.nextPanelSize - step)) / this.size;
            } else {
                newPrevPanelSize = (100 * (this.prevPanelSize - step)) / this.size;
                newNextPanelSize = (100 * (this.nextPanelSize + step)) / this.size;
            }
        } else {
            if (this.horizontal()) newPos = (event.pageX * 100) / this.size - (this.startPos * 100) / this.size;
            else newPos = (event.pageY * 100) / this.size - (this.startPos * 100) / this.size;

            newPrevPanelSize = (this.prevPanelSize as number) + newPos;
            newNextPanelSize = (this.nextPanelSize as number) - newPos;
        }

        this.prevSize = parseFloat(newPrevPanelSize).toFixed(4);

        if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
            (this.prevPanelElement as HTMLElement).style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            (this.nextPanelElement as HTMLElement).style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this._panelSizes[this.prevPanelIndex as number] = newPrevPanelSize;
            this._panelSizes[(this.prevPanelIndex as number) + 1] = newNextPanelSize;
        }
    }

    resizeEnd(event: MouseEvent | TouchEvent) {
        if (this.isStateful()) {
            this.saveState();
        }

        this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
        DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.removeClass((this.containerViewChild as ElementRef).nativeElement, 'p-splitter-resizing');
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

    onGutterTouchMove(event) {
        this.onResize(event);
        event.preventDefault();
    }

    onGutterTouchEnd(event: TouchEvent) {
        this.resizeEnd(event);
        this.unbindTouchListeners();

        if (event.cancelable) event.preventDefault();
    }

    repeat(event, index, step) {
        this.resizeStart(event, index, true);
        this.onResize(event, step, true);
    }

    setTimer(event, index, step) {
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

    onGutterKeyUp(event) {
        this.clearTimer();
        this.resizeEnd(event);
    }

    onGutterKeyDown(event, index) {
        switch (event.code) {
            case 'ArrowLeft': {
                if (this.layout === 'horizontal') {
                    this.setTimer(event, index, this.step * -1);
                }

                event.preventDefault();
                break;
            }

            case 'ArrowRight': {
                if (this.layout === 'horizontal') {
                    this.setTimer(event, index, this.step);
                }

                event.preventDefault();
                break;
            }

            case 'ArrowDown': {
                if (this.layout === 'vertical') {
                    this.setTimer(event, index, this.step * -1);
                }

                event.preventDefault();
                break;
            }

            case 'ArrowUp': {
                if (this.layout === 'vertical') {
                    this.setTimer(event, index, this.step);
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
        if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
            return false;
        }

        if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
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

    isNested() {
        if (this.el.nativeElement) {
            let parent = this.el.nativeElement.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-splitter')) {
                parent = parent.parentElement;
            }

            return parent !== null;
        } else {
            return false;
        }
    }

    isStateful() {
        return this.stateKey != null;
    }

    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return this.window.localStorage;

                case 'session':
                    return this.window.sessionStorage;

                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        } else {
            throw new Error('Storage is not a available by default on the server.');
        }
    }

    saveState() {
        this.getStorage().setItem(this.stateKey as string, JSON.stringify(this._panelSizes));
    }

    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey as string);

        if (stateString) {
            this._panelSizes = JSON.parse(stateString);
            let children = [...(this.containerViewChild as ElementRef).nativeElement.children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            children.forEach((child, i) => {
                child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });

            return true;
        }

        return false;
    }

    containerClass() {
        return {
            'p-splitter p-component': true,
            'p-splitter-horizontal': this.layout === 'horizontal',
            'p-splitter-vertical': this.layout === 'vertical'
        };
    }

    panelContainerClass() {
        return {
            'p-splitter-panel': true,
            'p-splitter-panel-nested': true
        };
    }

    gutterStyle() {
        if (this.horizontal()) return { width: this.gutterSize + 'px' };
        else return { height: this.gutterSize + 'px' };
    }

    horizontal() {
        return this.layout === 'horizontal';
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Splitter, SharedModule],
    declarations: [Splitter]
})
export class SplitterModule {}
