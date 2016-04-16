import {Directive,ElementRef,HostListener,Input,Output,EventEmitter} from 'angular2/core';

@Directive({
    selector: '[pDroppable]'
})
export class Droppable {
    
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();
    
    @Input() dropEffect: string;
    
    constructor(private el: ElementRef) {}
            
    @HostListener('drop', ['$event']) 
    drop(event) {
        event.preventDefault();
        this.onDrop.emit(event);
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

}