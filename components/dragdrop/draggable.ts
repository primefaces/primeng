import {Directive,ElementRef,HostListener,Input,Output,EventEmitter} from '@angular/core';
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
    
    private handle: any;
        
    constructor(private el: ElementRef, private domHandler: DomHandler) {}
    
    @HostListener('dragstart', ['$event']) 
    dragStart(event) {
        if(this.allowDrag()) {
            if(this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
                
            event.dataTransfer.setData(this.scope, this.scope);
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