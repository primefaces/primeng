import {Directive,ElementRef,HostListener,Input} from 'angular2/core';

@Directive({
    selector: '[pDraggable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Draggable {
    
    constructor(private el: ElementRef) {}
    
    @HostListener('ondragstart', ['$event']) 
    onDragStart(e) {
        console.log('start');
    }

}