import { CommonModule } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, NgZone, OnDestroy, Output, Renderer2, booleanAttribute } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { VoidListener } from 'primeng/ts-helpers';
/**
 * pDraggable directive apply draggable behavior to any element.
 * @group Components
 */
@Directive({
    selector: '[pDraggable]',
    host: {
        class: 'p-element'
    }
})
export class Draggable implements AfterViewInit, OnDestroy {
    @Input('pDraggable') scope: string | undefined;
    /**
     * Defines the cursor style.
     * @group Props
     */
    @Input() dragEffect: 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move' | 'all' | 'uninitialized' | undefined;
    /**
     * Selector to define the drag handle, by default anywhere on the target element is a drag handle to start dragging.
     * @group Props
     */
    @Input() dragHandle: string | undefined;
    /**
     * Callback to invoke when drag begins.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    @Output() onDragStart: EventEmitter<DragEvent> = new EventEmitter();
    /**
     * Callback to invoke when drag ends.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    @Output() onDragEnd: EventEmitter<DragEvent> = new EventEmitter();
    /**
     * Callback to invoke on dragging.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    @Output() onDrag: EventEmitter<DragEvent> = new EventEmitter();

    handle: any;

    dragListener: VoidListener;

    mouseDownListener: VoidListener;

    mouseUpListener: VoidListener;

    _pDraggableDisabled: boolean = false;

    constructor(
        public el: ElementRef,
        public zone: NgZone,
        private renderer: Renderer2
    ) {}

    @Input() get pDraggableDisabled(): boolean {
        return this._pDraggableDisabled;
    }
    set pDraggableDisabled(_pDraggableDisabled: boolean) {
        this._pDraggableDisabled = _pDraggableDisabled;

        if (this._pDraggableDisabled) {
            this.unbindMouseListeners();
        } else {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }

    ngAfterViewInit() {
        if (!this.pDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }

    bindDragListener() {
        if (!this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.dragListener = this.renderer.listen(this.el.nativeElement, 'drag', this.drag.bind(this));
            });
        }
    }

    unbindDragListener() {
        if (this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.dragListener && this.dragListener();
                this.dragListener = null;
            });
        }
    }

    bindMouseListeners() {
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.mousedown.bind(this));
                this.mouseUpListener = this.renderer.listen(this.el.nativeElement, 'mouseup', this.mouseup.bind(this));
            });
        }
    }

    unbindMouseListeners() {
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener && this.mouseDownListener();
                this.mouseUpListener && this.mouseUpListener();
                this.mouseDownListener = null;
                this.mouseUpListener = null;
            });
        }
    }

    drag(event: DragEvent) {
        this.onDrag.emit(event);
    }

    @HostListener('dragstart', ['$event'])
    dragStart(event: DragEvent) {
        if (this.allowDrag() && !this.pDraggableDisabled) {
            if (this.dragEffect) {
                (event.dataTransfer as DataTransfer).effectAllowed = this.dragEffect;
            }
            (event.dataTransfer as DataTransfer).setData('text', this.scope!);

            this.onDragStart.emit(event);

            this.bindDragListener();
        } else {
            event.preventDefault();
        }
    }

    @HostListener('dragend', ['$event'])
    dragEnd(event: DragEvent) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    }

    mousedown(event: MouseEvent) {
        this.handle = event.target;
    }

    mouseup(event: MouseEvent) {
        this.handle = null;
    }

    allowDrag(): boolean {
        if (this.dragHandle && this.handle) return DomHandler.matches(this.handle, this.dragHandle);
        else return true;
    }

    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
}
/**
 * pDroppable directive apply droppable behavior to any element.
 * @group Components
 */
@Directive({
    selector: '[pDroppable]',
    host: {
        class: 'p-element'
    }
})
export class Droppable implements AfterViewInit, OnDestroy {
    @Input('pDroppable') scope: string | string[] | undefined;
    /**
     * Whether the element is droppable, useful for conditional cases.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) pDroppableDisabled: boolean = false;
    /**
     * Defines the cursor style, valid values are none, copy, move, link, copyMove, copyLink, linkMove and all.
     * @group Props
     */
    @Input() dropEffect: 'none' | 'copy' | 'link' | 'move' | undefined;
    /**
     * Callback to invoke when a draggable enters drop area.
     * @group Emits
     */
    @Output() onDragEnter: EventEmitter<DragEvent> = new EventEmitter();
    /**
     * Callback to invoke when a draggable leave drop area.
     * @group Emits
     */
    @Output() onDragLeave: EventEmitter<DragEvent> = new EventEmitter();
    /**
     * Callback to invoke when a draggable is dropped onto drop area.
     * @group Emits
     */
    @Output() onDrop: EventEmitter<DragEvent> = new EventEmitter();

    constructor(
        public el: ElementRef,
        public zone: NgZone,
        private renderer: Renderer2
    ) {}

    dragOverListener: VoidListener;

    ngAfterViewInit() {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    }

    bindDragOverListener() {
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.dragOver.bind(this));
            });
        }
    }

    unbindDragOverListener() {
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener && this.dragOverListener();
                this.dragOverListener = null;
            });
        }
    }

    dragOver(event: DragEvent) {
        event.preventDefault();
    }

    @HostListener('drop', ['$event'])
    drop(event: DragEvent) {
        if (this.allowDrop(event)) {
            DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            event.preventDefault();
            this.onDrop.emit(event);
        }
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(event: DragEvent) {
        event.preventDefault();

        if (this.dropEffect) {
            (event.dataTransfer as DataTransfer).dropEffect = this.dropEffect;
        }

        DomHandler.addClass(this.el.nativeElement, 'p-draggable-enter');
        this.onDragEnter.emit(event);
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(event: DragEvent) {
        event.preventDefault();

        if (!this.el.nativeElement.contains(event.relatedTarget)) {
            DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            this.onDragLeave.emit(event);
        }
    }

    allowDrop(event: DragEvent): boolean {
        let dragScope = (event.dataTransfer as DataTransfer).getData('text');
        if (typeof this.scope == 'string' && dragScope == this.scope) {
            return true;
        } else if (Array.isArray(this.scope)) {
            for (let j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    ngOnDestroy() {
        this.unbindDragOverListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Draggable, Droppable],
    declarations: [Draggable, Droppable]
})
export class DragDropModule {}
