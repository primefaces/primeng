import {Component,ElementRef,AfterViewInit,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-splitButtonItem',
    template: `
        
    ` 
})
export class SplitButtonItem {

    @Input() icon: string;
        
    @Input() label: string;
    
    @Input() url: any;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
            
}