import {NgModule,Component,ElementRef,OnDestroy,AfterViewInit,AfterViewChecked,DoCheck,Input,Output,ContentChild,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {SharedModule} from '../common/shared';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-pickList',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{'ui-picklist ui-widget ui-helper-clearfix': true, 'ui-picklist-responsive': responsive}">
            <div class="ui-picklist-source-controls ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(sourcelist,source)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(sourcelist,source)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(sourcelist,source)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(sourcelist,source)"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-source-wrapper">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="sourceHeader">{{sourceHeader}}</div>
                <ul #sourcelist class="ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom" [ngStyle]="sourceStyle">
                    <li *ngFor="let item of source" [ngClass]="{'ui-picklist-item':true,'ui-state-hover':(hoveredItem==item),'ui-state-highlight':isSelected(item)}"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null" (click)="selectItem($event,item)">
                        <template [pTemplateWrapper]="itemTemplate" [item]="item"></template>
                    </li>
                </ul>
            </div>
            <div class="ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-right" (click)="moveRight(targetlist)"></button>
                    <button type="button" pButton icon="fa-angle-double-right" (click)="moveAllRight()"></button>
                    <button type="button" pButton icon="fa-angle-left" (click)="moveLeft(sourcelist)"></button>
                    <button type="button" pButton icon="fa-angle-double-left" (click)="moveAllLeft()"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-target-wrapper">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="targetHeader">{{targetHeader}}</div>
                <ul #targetlist class="ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom" [ngStyle]="targetStyle">
                    <li *ngFor="let item of target" [ngClass]="{'ui-picklist-item':true,'ui-state-hover':(hoveredItem==item),'ui-state-highlight':isSelected(item)}"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null" (click)="selectItem($event,item)">
                        <template [pTemplateWrapper]="itemTemplate" [item]="item"></template>
                    </li>
                </ul>
            </div>
            <div class="ui-picklist-target-controls ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(targetlist,target)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(targetlist,target)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(targetlist,target)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(targetlist,target)"></button>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class PickList implements OnDestroy,AfterViewChecked {

    @Input() source: any[];

    @Input() target: any[];

    @Input() sourceHeader: string;

    @Input() targetHeader: string;

    @Input() responsive: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() sourceStyle: any;

    @Input() targetStyle: any;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    hoveredItem: any;
    
    selectedItems: any[];
        
    reorderedListElement: any;
    
    movedUp: boolean;
    
    movedDown: boolean;

    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
        
    ngAfterViewChecked() {
        if(this.movedUp||this.movedDown) {
            let listItems = this.domHandler.find(this.reorderedListElement, 'li.ui-state-highlight');
            let listItem;
            
            if(this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            
            this.domHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }
    
    selectItem(event, item: any) {
        let metaKey = (event.metaKey||event.ctrlKey);
        let index = this.findIndexInSelection(item);
        let selected = (index != -1);
        
        if(selected && metaKey) {
            this.selectedItems.splice(index, 1);
        }
        else {
            this.selectedItems = (metaKey) ? this.selectedItems||[] : [];            
            this.selectedItems.push(item);
        }
    }

    moveUp(listElement, list) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, list);

                if(selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex-1];
                    list[selectedItemIndex-1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            
            this.movedUp = true;
            this.reorderedListElement = listElement;
        }
    }

    moveTop(listElement, list) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, list);

                if(selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex,1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            
            listElement.scrollTop = 0;
        }
    }

    moveDown(listElement, list) {
        if(this.selectedItems) {
            for(let i = this.selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, list);

                if(selectedItemIndex != (list.length - 1)) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex+1];
                    list[selectedItemIndex+1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            
            this.movedDown = true;
            this.reorderedListElement = listElement;
        }
    }

    moveBottom(listElement, list) {
        if(this.selectedItems) {
            for(let i = this.selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.findIndexInList(selectedItem, list);

                if(selectedItemIndex != (list.length - 1)) {
                    let movedItem = list.splice(selectedItemIndex,1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            
            listElement.scrollTop = listElement.scrollHeight;
        }
    }

    moveRight(targetListElement) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                if(this.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source),1)[0]);
                }
            }
            this.selectedItems = [];
        }
    }

    moveAllRight() {
        if(this.selectedItems) {
            for(let i = 0; i < this.source.length; i++) {
                this.target.push(this.source[i]);
            }
            this.source.splice(0, this.source.length);
            this.selectedItems = [];
        }
    }

    moveLeft(sourceListElement) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                if(this.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target),1)[0]);
                }
            }
            this.selectedItems = [];
        }
    }

    moveAllLeft() {
        if(this.selectedItems) {
            for(let i = 0; i < this.target.length; i++) {
                this.source.push(this.target[i]);
            }
            this.target.splice(0, this.target.length);
            this.selectedItems = [];
        }
    }

    isSelected(item: any) {
        return this.findIndexInSelection(item) != -1;
    }
    
    findIndexInSelection(item: any): number {
        return this.findIndexInList(item, this.selectedItems);
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

    ngOnDestroy() {

    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule],
    exports: [PickList,SharedModule],
    declarations: [PickList]
})
export class PickListModule { }
