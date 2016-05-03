import {Directive,ElementRef,HostListener,Input,Output,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pDroppable]',
    providers: [DomHandler]
})
export class Droppable {
    
    @Input('pDroppable') scope: string;
        
    @Input() dropEffect: string;
        
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef, private domHandler: DomHandler) {}
            
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
        if(this.allowDrop(event)) {
            event.preventDefault();
            this.onDragOver.emit(event);
        }
    }
    
    allowDrop(event): boolean {
        let allow = false;
        let types = event.dataTransfer.types;
        if(types && types.length) {
            for(let i = 0; i < types.length; i++) {
                if(types[i] == this.scope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    }
}