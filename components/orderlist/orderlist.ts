import {Component,ElementRef,DoCheck,Input,Output,ContentChild,TemplateRef,Renderer} from 'angular2/core';
import {Button} from '../button/button';
import {DomUtils} from '../utils/domutils';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-grid-row">
                <div class="ui-orderlist-controls ui-grid-col-2">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(listelement)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(listelement)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(listelement)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(listelement)"></button>
                </div>
                <div class="ui-grid-col-10">
                    <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                    <ul #listelement class="ui-widget-content ui-orderlist-list ui-corner-bottom" [attr.style]="listStyle" 
                        (mouseover)="onMouseover($event)" (mouseout)="onMouseout($event)" (click)="onClick($event)">
                        <template ngFor [ngForOf]="value" [ngForTemplate]="itemTemplate"></template>
                    </ul>
                </div>
            </div>
        </div>
    `,
    directives: [Button]
})
export class OrderList {

    @Input() value: any[];
    
    @Input() header: string;
    
    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() listStyle: string;
    
    @Input() responsive: boolean;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
        
    constructor(private el: ElementRef, private renderer: Renderer) {}
            
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
            }
        }
        else {
            if(!metaKey) {
                let siblings = DomUtils.siblings(item);
                for(let i = 0; i < siblings.length; i++) {
                    let sibling = siblings[i];
                    if(DomUtils.hasClass(sibling, 'ui-state-highlight')) {
                        DomUtils.removeClass(sibling, 'ui-state-highlight');
                    }
                }
            }
            
            DomUtils.removeClass(item, 'ui-state-hover');
            DomUtils.addClass(item, 'ui-state-highlight');
        }
    }

    moveUp(listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = 0; i < selectedElements.length; i++) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != 0) {
                let movedItem = this.value[selectedElementIndex];
                let temp = this.value[selectedElementIndex-1];
                this.value[selectedElementIndex-1] = movedItem;
                this.value[selectedElementIndex] = temp;
                DomUtils.scrollInView(listElement, listElement.children[selectedElementIndex - 1]);
            }
            else {
                break;
            }
        }
    }
    
    moveTop(listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = 0; i < selectedElements.length; i++) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != 0) {
                let movedItem = this.value.splice(selectedElementIndex,1)[0];
                this.value.unshift(movedItem);
                listElement.scrollTop = 0;
            }
            else {
                break;
            }
        }
    }
    
    moveDown(listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = selectedElements.length - 1; i >= 0; i--) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != (this.value.length - 1)) {
                let movedItem = this.value[selectedElementIndex];
                let temp = this.value[selectedElementIndex+1];
                this.value[selectedElementIndex+1] = movedItem;
                this.value[selectedElementIndex] = temp;
                DomUtils.scrollInView(listElement, listElement.children[selectedElementIndex + 1]);
            }
            else {
                break;
            }
        }
    }
    
    moveBottom(listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = selectedElements.length - 1; i >= 0; i--) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != (this.value.length - 1)) {
                let movedItem = this.value.splice(selectedElementIndex,1)[0];
                this.value.push(movedItem);
                listElement.scrollTop = listElement.scrollHeight;
            }
            else {
                break;
            }
        }
    }
        
    getSelectedListElements(listElement) {
        return DomUtils.find(listElement, 'li.ui-state-highlight');
    }
}