import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers} from 'angular2/core';
import {Button} from '../button/button';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-grid ui-widget':true}" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-grid-row">
                <div class="ui-orderlist-controls ui-grid-col-2">
                    <button type="button" pButton icon="fa-angle-up"></button>
                    <button type="button" pButton icon="fa-angle-double-up"></button>
                    <button type="button" pButton icon="fa-angle-down"></button>
                    <button type="button" pButton icon="fa-angle-double-down"></button>
                </div>
                <div class="ui-grid-col-10">
                    <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                    <ul class="ui-widget-content ui-orderlist-list ui-corner-bottom" [attr.style]="listStyle">
                        <template ngFor [ngForOf]="value" [ngForTemplate]="itemTemplate"></template>
                    </ul>
                </div>
            </div>
        </div>
    `,
    directives: [Button]
})
export class OrderList implements AfterViewInit,OnDestroy {

    @Input() value: any[];
    
    @Input() header: string;
    
    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() listStyle: string;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
        
    initialized: boolean;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        setTimeout(() => {
            jQuery(this.el.nativeElement.children[0]).puiorderlist({
                enhanced: true,
                multiple: false,
                dragdrop: false,
                onMoveUp: (event: Event, ui: any) => {
                    this.moveUp(ui.index);
                },
                onMoveTop: (event: Event, ui: any) => {
                    this.moveTop(ui.index);
                },
                onMoveDown: (event: Event, ui: any) => {
                    this.moveDown(ui.index);
                },
                onMoveBottom: (event: Event, ui: any) => {
                    this.moveBottom(ui.index);
                }
            });
            this.initialized = true;
        }, 10);
    }
    
    moveUp(index: number) {
        if(index !== 0) {
            let movedItem = this.value[index];
            let temp = this.value[index-1];
            this.value[index-1] = movedItem;
            this.value[index] = temp;
        }
    }
    
    moveTop(index: number) {
        if(index !== 0) {
            let movedItem = this.value.splice(index,1)[0];
            this.value.unshift(movedItem);
        }
    }
    
    moveDown(index: number) {
        if(index !== (this.value.length - 1)) {
            let movedItem = this.value[index];
            let temp = this.value[index+1];
            this.value[index+1] = movedItem;
            this.value[index] = temp;
        }
    }
    
    moveBottom(index: number) {
        if(index !== (this.value.length - 1)) {
            let movedItem = this.value.splice(index,1)[0];
            this.value.push(movedItem);
        }
    }
    
    ngOnDestroy() {
        if(this.initialized) {
            jQuery(this.el.nativeElement.children[0]).puiorderlist('destroy');
            this.initialized = false;
        }
    }
}