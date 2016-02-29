import {Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,ContentChild,TemplateRef,Renderer} from 'angular2/core';
import {Button} from '../button/button';
import {DomUtils} from '../utils/domutils';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-grid-row">
                <div class="ui-orderlist-controls ui-grid-col-2">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp()"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop()"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown()"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom()"></button>
                </div>
                <div class="ui-grid-col-10">
                    <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                    <ul class="ui-widget-content ui-orderlist-list ui-corner-bottom" [attr.style]="listStyle" 
                        (mouseover)="onMouseover($event)" (mouseout)="onMouseout($event)" (click)="onClick($event)">
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
    
    @Input() responsive: boolean;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
            
    items: any;
    
    selectedIndex: number = null;
    
    listContainer: any;
        
    constructor(private el: ElementRef, private renderer: Renderer) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.listContainer = DomUtils.find(this.el.nativeElement, 'ul')[0];
            this.items = this.listContainer.children;
            this.bindEvents();
        }, 25);
    }
        
    bindEvents() {        
        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            DomUtils.addClass(item, 'ui-orderlist-item');
        }
    }
    
    onMouseover(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            DomUtils.addClass(item, 'ui-state-hover');
        }
    }
    
    onMouseout(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            DomUtils.removeClass(item, 'ui-state-hover');
        }
    }
    
    onClick(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    }
    
    findListItem(element) {
        if(element.nodeName == 'LI') {
            return element;
        }
        else {
            let parent = element.parentElement;
            while(parent.nodeName != 'LI') {
                parent = parent.parentElement;
            }
            return parent;
        }
    }
    
    onItemClick(event, item) {
        let metaKey = (event.metaKey||event.ctrlKey);
        
        if(DomUtils.hasClass(item, 'ui-state-highlight')) {
            if(metaKey) {
                DomUtils.removeClass(item, 'ui-state-highlight');
                this.selectedIndex = null;
            }
        }
        else {
            let siblings = DomUtils.siblings(item);
            for(let i = 0; i < siblings.length; i++) {
                let sibling = siblings[i];
                if(DomUtils.hasClass(sibling, 'ui-state-highlight')) {
                    DomUtils.removeClass(sibling, 'ui-state-highlight');
                }
            }
            
            DomUtils.removeClass(item, 'ui-state-hover');
            DomUtils.addClass(item, 'ui-state-highlight');
            this.selectedIndex = DomUtils.index(item);
        }
    }

    moveUp() {
        if(this.selectedIndex != null && this.selectedIndex !== 0) {
            let movedItem = this.value[this.selectedIndex];
            let temp = this.value[this.selectedIndex-1];
            this.value[this.selectedIndex-1] = movedItem;
            this.value[this.selectedIndex] = temp;
            this.selectedIndex--;
            DomUtils.scrollInView(this.listContainer, this.items[this.selectedIndex]);
        }
    }
    
    moveTop() {
        if(this.selectedIndex != null && this.selectedIndex !== 0) {
            let movedItem = this.value.splice(this.selectedIndex,1)[0];
            this.value.unshift(movedItem);
            this.selectedIndex = 0;
            this.listContainer.scrollTop = 0;
        }
    }
    
    moveDown() {
        if(this.selectedIndex != null && this.selectedIndex !== (this.value.length - 1)) {
            let movedItem = this.value[this.selectedIndex];
            let temp = this.value[this.selectedIndex+1];
            this.value[this.selectedIndex+1] = movedItem;
            this.value[this.selectedIndex] = temp;
            this.selectedIndex++;
            DomUtils.scrollInView(this.listContainer, this.items[this.selectedIndex]);
        }
    }
    
    moveBottom() {
        if(this.selectedIndex != null && this.selectedIndex !== (this.value.length - 1)) {
            let movedItem = this.value.splice(this.selectedIndex,1)[0];
            this.value.push(movedItem);
            this.selectedIndex = this.value.length - 1;
            this.listContainer.scrollTop = this.listContainer.scrollHeight;
        }
    }
    
    ngOnDestroy() {
        this.listContainer = null;
        this.items = null;
    }
}