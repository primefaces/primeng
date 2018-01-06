import {NgModule,Directive,OnDestroy,AfterViewInit,ElementRef,HostListener,Input,Output,EventEmitter,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pDraggable]',
    host: {
        '[draggable]': 'true'
    },
    providers: [DomHandler]
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

    mouseOverListener: any;

    mouseLeaveListener: any;
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {}
    
    ngAfterViewInit() {
        this.bindMouseListeners();
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
        if (!this.mouseOverListener && this.mouseLeaveListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseOverListener = this.mouseover.bind(this);
                this.mouseLeaveListener = this.mouseleave.bind(this);
                this.el.nativeElement.addEventListener('mouseover', this.mouseOverListener);
                this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
            });
        }
    }

    unbindMouseListeners() {
        if (this.mouseOverListener && this.mouseLeaveListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('mouseover', this.mouseOverListener);
                this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
                this.mouseOverListener = null;
                this.mouseLeaveListener = null;
            });
        }
    }

    drag(event) {
        this.onDrag.emit(event);
    }

    @HostListener('dragstart', ['$event']) 
    dragStart(event) {
        if(this.allowDrag()) {
            if(this.dragEffect) {
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
    
    mouseover(event) {
        this.handle = event.target;
    }

    mouseleave(event) {
        this.handle = null;
    }
    
    allowDrag() : boolean {
        if(this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    }

    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
    
}

@Directive({
    selector: '[pDroppable]',
    providers: [DomHandler]
})
export class Droppable implements AfterViewInit, OnDestroy {
    
    @Input('pDroppable') scope: string|string[];
        
    @Input() dropEffect: string;
        
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {}

    dragOverListener: any;

    ngAfterViewInit() {
        this.bindDragOverListener();
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
        if(this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    }
    
    @HostListener('dragenter', ['$event']) 
    dragEnter(event) {
        event.preventDefault();
        
        if(this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
                
        this.onDragEnter.emit(event);
    }
    
    @HostListener('dragleave', ['$event']) 
    dragLeave(event) {
        event.preventDefault();
                
        this.onDragLeave.emit(event);
    }
        
    allowDrop(event): boolean {
        let dragScope = event.dataTransfer.getData('text');
        if(typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if(this.scope instanceof Array) {
            for(let j = 0; j < this.scope.length; j++) {
                if(dragScope == this.scope[j]) {
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