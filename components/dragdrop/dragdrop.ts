import {NgModule,Directive,ElementRef,HostListener,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pDraggable]',
    host: {
        '[draggable]': 'true'
    },
    providers: [DomHandler]
})
export class Draggable {
    
    @Input('pDraggable') scope: string;
        
    @Input() dragEffect: string;
    
    @Input() dragHandle: string;
    
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrag: EventEmitter<any> = new EventEmitter();
    
    public handle: any;
        
    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
    @HostListener('dragstart', ['$event']) 
    dragStart(event) {
        if(this.allowDrag()) {
            if(this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            
            this.onDragStart.emit(event);
        }
        else {
            event.preventDefault();
        }
    }
    
    @HostListener('drag', ['$event']) 
    drag(event) {
        this.onDrag.emit(event);
    }
    
    @HostListener('dragend', ['$event']) 
    dragEnd(event) {
        this.onDragEnd.emit(event);
    }
    
    @HostListener('mouseover', ['$event']) 
    mouseover(event) {
        this.handle = event.target;
    }
    
    @HostListener('mouseleave', ['$event']) 
    mouseleave(event) {
        this.handle = null;
    }
    
    allowDrag() : boolean {
        if(this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    }
    
}

@Directive({
    selector: '[pDroppable]',
    providers: [DomHandler]
})
export class Droppable {
    
    @Input('pDroppable') scope: string|string[];
        
    @Input() dropEffect: string;
        
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    constructor(public el: ElementRef, public domHandler: DomHandler) {}
            
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
    
    @HostListener('dragover', ['$event']) 
    dragOver(event) {
        event.preventDefault();
        this.onDragOver.emit(event);
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
}

@NgModule({
    imports: [CommonModule],
    exports: [Draggable,Droppable],
    declarations: [Draggable,Droppable]
})
export class DragDropModule { }