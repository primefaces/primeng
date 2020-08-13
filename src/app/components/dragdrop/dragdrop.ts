import {NgModule,Directive,OnDestroy,AfterViewInit,ElementRef,HostListener,Input,Output,EventEmitter,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';

@Directive({
    selector: '[pDraggable]'
})
export class Draggable implements AfterViewInit, OnDestroy {
    
    @Input('pDraggable') scope: string;
        
    @Input() dragEffect: string;
    
    @Input() dragHandle: string;
    
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrag: EventEmitter<any> = new EventEmitter();
    
    handle: any;

    dragListener: any;

    mouseDownListener: any;

    mouseUpListener: any;

    _pDraggableDisabled: boolean;
        
    constructor(public el: ElementRef, public zone: NgZone) {}

    @Input() get pDraggableDisabled(): boolean {
        return this._pDraggableDisabled;
    }
    set pDraggableDisabled(_pDraggableDisabled:boolean) {
        this._pDraggableDisabled = _pDraggableDisabled;
        
        if (this._pDraggableDisabled) {
            this.unbindMouseListeners();
        }
        else {
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
                this.dragListener = this.drag.bind(this);
                this.el.nativeElement.addEventListener('drag', this.dragListener);
            });
        }
    }

    unbindDragListener() {
        if (this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('drag', this.dragListener);
                this.dragListener = null;
            });
        }
    }

    bindMouseListeners() {
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.mousedown.bind(this);
                this.mouseUpListener = this.mouseup.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.addEventListener('mouseup', this.mouseUpListener);
            });
        }
    }

    unbindMouseListeners() {
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.removeEventListener('mouseup', this.mouseUpListener);
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
        }
        else {
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
    
    allowDrag() : boolean {
        if (this.dragHandle && this.handle)
            return DomHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    }

    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
    
}

@Directive({
    selector: '[pDroppable]'
})
export class Droppable implements AfterViewInit, OnDestroy {
    
    @Input('pDroppable') scope: string|string[];

    @Input() pDroppableDisabled: boolean;
        
    @Input() dropEffect: string;
        
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    
    constructor(public el: ElementRef, public zone: NgZone) {}

    dragOverListener: any;

    ngAfterViewInit() {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    }

    bindDragOverListener() {
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener = this.dragOver.bind(this);
                this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            });
        }
    }

    unbindDragOverListener() {
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('dragover', this.dragOverListener);
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
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for(let j = 0; j < this.scope.length; j++) {
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
    exports: [Draggable,Droppable],
    declarations: [Draggable,Droppable]
})
export class DragDropModule { }