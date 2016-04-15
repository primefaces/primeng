import {Directive,ElementRef,HostListener,Input} from 'angular2/core';

@Directive({
    selector: '[pDraggable]',
    host: {
        
    }
})
export class Droppable {
    
    constructor(private el: ElementRef) {}
    
    @HostListener('ondropover', ['$event']) 
    onDropOver(e) {
        e.preventDefault();
    }

}