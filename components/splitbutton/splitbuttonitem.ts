import {Component,ElementRef,AfterViewInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
    selector: 'p-splitButtonItem',
    template: `
        
    ` 
})
export class SplitButtonItem {

    @Input() icon: string;
        
    @Input() label: string;
    
    @Input() url: string;
    
    @Input() routerLink: any;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
            
}