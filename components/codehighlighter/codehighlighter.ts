import {Directive, ElementRef, OnInit} from 'angular2/core';

@Directive({
    selector: '[pCode]'
})
export class pCode implements OnInit{
    
    initialized: boolean;
    
    constructor(private el: ElementRef) {
        this.initialized = false;
    }
    
    ngOnInit() {
        Prism.highlightElement(
            this.el.nativeElement
        );
        this.initialized = true;
    }
}

