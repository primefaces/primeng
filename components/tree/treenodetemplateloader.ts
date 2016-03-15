import {Component,ElementRef,OnInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef,ViewContainerRef} from 'angular2/core';

@Component({
    selector: 'p-treeNodeTemplateLoader',
    template: ``
})
export class TreeNodeTemplateLoader implements OnInit {
        
    @Input() node: any;
    
    @Input() template: TemplateRef;
        
    constructor(private viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template);
        view.setLocal('\$implicit', this.node);
    }
}