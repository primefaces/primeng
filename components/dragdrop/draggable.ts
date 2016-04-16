import {Directive,ElementRef,HostListener,Input,Output,EventEmitter} from 'angular2/core';

@Directive({
    selector: '[pDraggable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Draggable {
    
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrag: EventEmitter<any> = new EventEmitter();
    
    @Input() dragEffect: string;
        
    constructor(private el: ElementRef) {}
    
    @HostListener('dragstart', ['$event']) 
    dragStart(event) {
        if(this.dragEffect) {
            event.dataTransfer.effectAllowed = this.dragEffect;
        }
                
        this.onDragStart.emit(event);
    }
    
    @HostListener('drag', ['$event']) 
    drag(event) {
        this.onDrag.emit(event);
    }
    
    @HostListener('dragend', ['$event']) 
    dragEnd(event) {
        this.onDragEnd.emit(event);
    }
    
}