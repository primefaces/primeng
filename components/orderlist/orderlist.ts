import {Component,ElementRef,DoCheck,Input,Output,ContentChild,TemplateRef,EventEmitter} from 'angular2/core';
import {Button} from '../button/button';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-grid-row">
                <div class="ui-orderlist-controls ui-grid-col-2">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp($event,listelement)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop($event,listelement)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown($event,listelement)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom($event,listelement)"></button>
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
    directives: [Button],
    providers: [DomHandler]
})
export class OrderList {

    @Input() value: any[];
    
    @Input() header: string;
    
    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() listStyle: string;
    
    @Input() responsive: boolean;
    
    @Output() onReorder: EventEmitter<any> = new EventEmitter();

    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
        
    constructor(private el: ElementRef, private domHandler: DomHandler) {}
            
    onMouseover(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    }
    
    onMouseout(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
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
        
        if(this.domHandler.hasClass(item, 'ui-state-highlight')) {
            if(metaKey) {
                this.domHandler.removeClass(item, 'ui-state-highlight');
            }
        }
        else {
            if(!metaKey) {
                let siblings = this.domHandler.siblings(item);
                for(let i = 0; i < siblings.length; i++) {
                    let sibling = siblings[i];
                    if(this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
                        this.domHandler.removeClass(sibling, 'ui-state-highlight');
                    }
                }
            }
            
            this.domHandler.removeClass(item, 'ui-state-hover');
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
    }

    moveUp(event,listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        if(selectedElements.length) {
            for(let i = 0; i < selectedElements.length; i++) {
                let selectedElement = selectedElements[i];
                let selectedElementIndex: number = this.domHandler.index(selectedElement);

                if(selectedElementIndex != 0) {
                    let movedItem = this.value[selectedElementIndex];
                    let temp = this.value[selectedElementIndex-1];
                    this.value[selectedElementIndex-1] = movedItem;
                    this.value[selectedElementIndex] = temp;
                    this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex - 1]);
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
    
    moveTop(event,listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        if(selectedElements.length) {
            for(let i = 0; i < selectedElements.length; i++) {
                let selectedElement = selectedElements[i];
                let selectedElementIndex: number = this.domHandler.index(selectedElement);

                if(selectedElementIndex != 0) {
                    let movedItem = this.value.splice(selectedElementIndex,1)[0];
                    this.value.unshift(movedItem);
                    listElement.scrollTop = 0;
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
    
    moveDown(event,listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        if(selectedElements.length) {
            for(let i = selectedElements.length - 1; i >= 0; i--) {
                let selectedElement = selectedElements[i];
                let selectedElementIndex: number = this.domHandler.index(selectedElement);

                if(selectedElementIndex != (this.value.length - 1)) {
                    let movedItem = this.value[selectedElementIndex];
                    let temp = this.value[selectedElementIndex+1];
                    this.value[selectedElementIndex+1] = movedItem;
                    this.value[selectedElementIndex] = temp;
                    this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex + 1]);
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
    
    moveBottom(event,listElement) {
        let selectedElements = this.getSelectedListElements(listElement);
        if(selectedElements.length) {
            for(let i = selectedElements.length - 1; i >= 0; i--) {
                let selectedElement = selectedElements[i];
                let selectedElementIndex: number = this.domHandler.index(selectedElement);

                if(selectedElementIndex != (this.value.length - 1)) {
                    let movedItem = this.value.splice(selectedElementIndex,1)[0];
                    this.value.push(movedItem);
                    listElement.scrollTop = listElement.scrollHeight;
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
        
    getSelectedListElements(listElement) {
        return this.domHandler.find(listElement, 'li.ui-state-highlight');
    }
}