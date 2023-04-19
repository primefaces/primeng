import { NgModule, Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

@Directive({
    selector: '[pDraggable]',
    host: {
        class: 'p-element'
    }
})
export class Draggable implements AfterViewInit, OnDestroy {
    @Input('pDraggable') scope: string;

    @Input() dragEffect: string;

    @Input() dragHandle: string;

    @Output() onDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

    @Output() onDrag: EventEmitter<any> = new EventEmitter();

    handle: any;

    dragListener: VoidFunction | null;

    mouseDownListener: VoidFunction | null;

    mouseUpListener: VoidFunction | null;

    _pDraggableDisabled: boolean;

    constructor(public el: ElementRef, public zone: NgZone, private renderer: Renderer2) {}

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
                this.dragListener();
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
                this.mouseDownListener();
                this.mouseUpListener();
                this.mouseDownListener = null;
                this.mouseUpListener = null;
            });
        }
    }

    drag(event) {
        this.onDrag.emit(event);
    }

    @HostListener('dragstart', ['$event'])
    dragStart(event) {
        if (this.allowDrag() && !this.pDraggableDisabled) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);

            this.onDragStart.emit(event);

            this.bindDragListener();
        } else {
            event.preventDefault();
        }
    }

    @HostListener('dragend', ['$event'])
    dragEnd(event) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    }

    mousedown(event) {
        this.handle = event.target;
    }

    mouseup(event) {
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

@Directive({
    selector: '[pDroppable]',
    host: {
        class: 'p-element'
    }
})
export class Droppable implements AfterViewInit, OnDestroy {
    @Input('pDroppable') scope: string | string[];

    @Input() pDroppableDisabled: boolean;

    @Input() dropEffect: string;

    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();

    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

    @Output() onDrop: EventEmitter<any> = new EventEmitter();

    constructor(public el: ElementRef, public zone: NgZone, private renderer: Renderer2) {}

    dragOverListener: VoidFunction | null;

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
                this.dragOverListener();
                this.dragOverListener = null;
            });
        }
    }

    dragOver(event) {
        event.preventDefault();
    }

    @HostListener('drop', ['$event'])
    drop(event) {
        if (this.allowDrop(event)) {
            DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            event.preventDefault();
            this.onDrop.emit(event);
        }
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(event) {
        event.preventDefault();

        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }

        DomHandler.addClass(this.el.nativeElement, 'p-draggable-enter');
        this.onDragEnter.emit(event);
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(event) {
        event.preventDefault();

        DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
        this.onDragLeave.emit(event);
    }

    allowDrop(event): boolean {
        let dragScope = event.dataTransfer.getData('text');
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
