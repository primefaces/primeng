import {Component,ElementRef,DoCheck,Input,Output,ContentChild,TemplateRef,EventEmitter} from '@angular/core';
import {Button} from '../button/button';
import {DomHandler} from '../dom/domhandler';
import {TemplateWrapper} from '../common';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-grid-row">
                <div class="ui-orderlist-controls ui-grid-col-2">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp($event,listelement)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop($event,listelement)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown($event,listelement)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom($event,listelement)"></button>
                </div>
                <div class="ui-grid-col-10">
                    <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                    <ul #listelement class="ui-widget-content ui-orderlist-list ui-corner-bottom" [ngStyle]="listStyle">
                        <li *ngFor="let item of value" 
                            [ngClass]="{'ui-orderlist-item':true,'ui-state-hover':(hoveredItem==item),'ui-state-highlight':isSelected(item)}"
                            (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null" (click)="onItemClick($event,item)">
                            <template [pTemplateWrapper]="itemTemplate" [item]="item"></template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    directives: [Button,TemplateWrapper],
    providers: [DomHandler]
})
export class OrderList {

    @Input() value: any[];
    
    @Input() header: string;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() listStyle: any;
    
    @Input() responsive: boolean;
    
    @Output() onReorder: EventEmitter<any> = new EventEmitter();

    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    hoveredItem: any;
    
    selectedItems: any[];
        
    constructor(private el: ElementRef, private domHandler: DomHandler) {}
                
    onItemClick(event, item) {
        let metaKey = (event.metaKey||event.ctrlKey);
        let index = this.findIndexInList(item, this.selectedItems);
        let selected = (index != -1);
        
        if(selected && metaKey) {
            this.selectedItems.splice(index, 1);
        }
        else {
            this.selectedItems = (metaKey) ? this.selectedItems||[] : [];            
            this.selectedItems.push(item);
        }
    }
    
    isSelected(item: any) {
        return this.findIndexInList(item, this.selectedItems) != -1;
    }
        
    findIndexInList(item: any, list: any): number {
        let index: number = -1;
        
        if(list) {
            for(let i = 0; i < list.length; i++) {
                if(list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }

    moveUp(event,listElement) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if(selectedItemIndex != 0) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex-1];
                    this.value[selectedItemIndex-1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
    
    moveTop(event,listElement) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if(selectedItemIndex != 0) {
                    let movedItem = this.value.splice(selectedItemIndex,1)[0];
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
        if(this.selectedItems) {
            for(let i = this.selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if(selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex+1];
                    this.value[selectedItemIndex+1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
    
    moveBottom(event,listElement) {
        if(this.selectedItems) {
            for(let i = this.selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if(selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value.splice(selectedItemIndex,1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
        }
    }
}