import {NgModule,Component,ElementRef,AfterViewInit,AfterContentInit,AfterViewChecked,DoCheck,Input,Output,ContentChildren,QueryList,TemplateRef,EventEmitter,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';

@Component({
    selector: 'p-pickList',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{'ui-picklist ui-widget ui-helper-clearfix': true,'ui-picklist-responsive': responsive}">
            <div class="ui-picklist-source-controls ui-picklist-buttons" *ngIf="showSourceControls">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-source-wrapper" [ngClass]="{'ui-picklist-listwrapper-nocontrols':!showSourceControls}">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="sourceHeader">{{sourceHeader}}</div>
                <div class="ui-picklist-filter-container ui-widget-content" *ngIf="filterBy">
                    <input type="text" role="textbox" (keyup)="onFilter($event,source,-1)" class="ui-picklist-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled" [attr.placeholder]="sourceFilterPlaceholder">
                    <span class="fa fa-search"></span>
                </div>
                <ul #sourcelist class="ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom" [ngStyle]="sourceStyle" (dragover)="onListMouseMove($event,-1)">
                    <li class="ui-picklist-droppoint-empty" *ngIf="dragdrop && source && source.length == 0" 
                    (dragover)="onEmptyListDragOver($event, -1)" (drop)="onEmptyListDrop($event, -1)"></li>
                    <ng-template ngFor let-item [ngForOf]="source" let-i="index" let-l="last">
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, -1)" (drop)="onDrop($event, i, -1)" (dragleave)="onDragLeave($event, -1)" 
                        [ngClass]="{'ui-state-highlight': (i === dragOverItemIndexSource)}" [style.display]="isItemVisible(item, -1) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsSource)}"
                            (click)="onItemClick($event,item,selectedItemsSource)" (touchend)="onItemTouchEnd($event)"
                            [style.display]="isItemVisible(item, -1) ? 'block' : 'none'"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i, -1)" (dragend)="onDragEnd($event)">
                            <ng-template [pTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
                        </li>
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, -1)" (drop)="onDrop($event, i + 1, -1)" (dragleave)="onDragLeave($event, -1)" 
                        [ngClass]="{'ui-state-highlight': (i + 1 === dragOverItemIndexSource)}"></li>
                    </ng-template>
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
            <div class="ui-picklist-listwrapper ui-picklist-target-wrapper" [ngClass]="{'ui-picklist-listwrapper-nocontrols':!showTargetControls}">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="targetHeader">{{targetHeader}}</div>
                <div class="ui-picklist-filter-container ui-widget-content" *ngIf="filterBy">
                    <input type="text" role="textbox" (keyup)="onFilter($event,target,1)" class="ui-picklist-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled" [attr.placeholder]="targetFilterPlaceholder">
                    <span class="fa fa-search"></span>
                </div>
                <ul #targetlist class="ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom" [ngStyle]="targetStyle" (dragover)="onListMouseMove($event,1)">
                    <li class="ui-picklist-droppoint-empty" *ngIf="dragdrop && target && target.length == 0" 
                    (dragover)="onEmptyListDragOver($event, 1)" (drop)="onEmptyListDrop($event, 1)"></li>
                    <ng-template ngFor let-item [ngForOf]="target" let-i="index" let-l="last">
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, 1)" (drop)="onDrop($event, i, 1)" (dragleave)="onDragLeave($event, 1)" 
                        [ngClass]="{'ui-state-highlight': (i === dragOverItemIndexTarget)}" [style.display]="isItemVisible(item, 1) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsTarget)}"
                            (click)="onItemClick($event,item,selectedItemsTarget)" (touchend)="onItemTouchEnd($event)"
                            [style.display]="isItemVisible(item, 1) ? 'block' : 'none'"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i, 1)" (dragend)="onDragEnd($event)">
                            <ng-template [pTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
                        </li>
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, 1)" (drop)="onDrop($event, i + 1, 1)" (dragleave)="onDragLeave($event, 1)" 
                        [ngClass]="{'ui-state-highlight': (i + 1 === dragOverItemIndexTarget)}"></li>
                    </ng-template>
                </ul>
            </div>
            <div class="ui-picklist-target-controls ui-picklist-buttons" *ngIf="showTargetControls">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler,ObjectUtils]
})
export class PickList implements AfterViewChecked,AfterContentInit {

    @Input() source: any[];

    @Input() target: any[];

    @Input() sourceHeader: string;

    @Input() targetHeader: string;

    @Input() responsive: boolean;
    
    @Input() filterBy: string;
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() dragdrop: boolean;
    
    @Input() dragdropScope: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() sourceStyle: any;

    @Input() targetStyle: any;
    
    @Input() showSourceControls: boolean = true;
    
    @Input() showTargetControls: boolean = true;
    
    @Input() sourceFilterPlaceholder: string;
    
    @Input() targetFilterPlaceholder: string;
    
    @Output() onMoveToSource: EventEmitter<any> = new EventEmitter();
    
    @Output() onMoveAllToSource: EventEmitter<any> = new EventEmitter();
    
    @Output() onMoveAllToTarget: EventEmitter<any> = new EventEmitter();
    
    @Output() onMoveToTarget: EventEmitter<any> = new EventEmitter();
    
    @Output() onSourceReorder: EventEmitter<any> = new EventEmitter();
    
    @Output() onTargetReorder: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('sourcelist') listViewSourceChild: ElementRef;
    
    @ViewChild('targetlist') listViewTargetChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;
    
    public visibleOptionsSource: any[];
    
    public visibleOptionsTarget: any[];
            
    selectedItemsSource: any[] = [];
    
    selectedItemsTarget: any[] = [];
        
    reorderedListElement: any;
    
    draggedItemIndexSource: number;
    
    draggedItemIndexTarget: number;
    
    dragOverItemIndexSource: number;
    
    dragOverItemIndexTarget: number;
    
    dragging: boolean;
    
    movedUp: boolean;
    
    movedDown: boolean;
    
    itemTouched: boolean;
    
    filterValueSource: string;
    
    filterValueTarget: string;
    
    fromListType: number;
    
    toListType: number;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
        
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
    
    onItemClick(event, item: any, selectedItems: any[]) {
        let index = this.findIndexInSelection(item,selectedItems);
        let selected = (index != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        
        if(metaSelection) {
            let metaKey = (event.metaKey||event.ctrlKey);
            
            if(selected && metaKey) {
                selectedItems.splice(index, 1);
            }
            else {
                if(!metaKey) {
                    selectedItems.length = 0;
                }         
                selectedItems.push(item);
            }
        }
        else {
            if(selected)
                selectedItems.splice(index, 1);
            else
                selectedItems.push(item);
        }
        
        
        this.itemTouched = false;
    }
    
    onFilter(event: KeyboardEvent, data: any[], listType: number) {
        let query = (<HTMLInputElement> event.target).value.trim().toLowerCase();
        
        if(listType === -1)
            this.filterValueSource = query;
        else
            this.filterValueTarget = query;
                
        this.activateFilter(data, listType);
    }
    
    activateFilter(data: any[], listType: number) {
        let searchFields = this.filterBy.split(',');
        
        if(listType === -1)
            this.visibleOptionsSource = this.objectUtils.filter(data, searchFields, this.filterValueSource);
        else
            this.visibleOptionsTarget = this.objectUtils.filter(data, searchFields, this.filterValueTarget);
    }
    
    isItemVisible(item: any, listType: number): boolean {
        if(listType == -1)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }
    
    isVisibleInList(data: any[], item: any, filterValue: string): boolean {
        if(filterValue && filterValue.trim().length) {
            for(let i = 0; i < data.length; i++) {
                if(item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    
    onItemTouchEnd(event) {
        this.itemTouched = true;
    }

    moveUp(listElement, list, selectedItems, callback) {
        if(selectedItems && selectedItems.length) {
            for(let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
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
            callback.emit({items: selectedItems});
        }
    }

    moveTop(listElement, list, selectedItems, callback) {
        if(selectedItems && selectedItems.length) {
            for(let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
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
            callback.emit({items: selectedItems});
        }
    }

    moveDown(listElement, list, selectedItems, callback) {
        if(selectedItems && selectedItems.length) {
            for(let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
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
            callback.emit({items: selectedItems});
        }
    }

    moveBottom(listElement, list, selectedItems, callback) {
        if(selectedItems && selectedItems.length) {
            for(let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
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
            callback.emit({items: selectedItems});
        }
    }

    moveRight(targetListElement) {
        if(this.selectedItemsSource && this.selectedItemsSource.length) {
            for(let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if(this.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source),1)[0]);
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            this.selectedItemsSource = [];
        }
    }

    moveAllRight() {
        if(this.source) {
            for(let i = 0; i < this.source.length; i++) {
                this.target.push(this.source[i]);
            }
            
            this.onMoveToTarget.emit({
                items: this.source
            });
            
            this.onMoveAllToTarget.emit({
                items: this.source
            });
            
            this.source.splice(0, this.source.length);
            
            this.selectedItemsSource = [];
        }
    }

    moveLeft(sourceListElement) {
        if(this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for(let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if(this.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target),1)[0]);
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            
            this.selectedItemsTarget = [];
        }
    }

    moveAllLeft() {
        if(this.target) {
            for(let i = 0; i < this.target.length; i++) {
                this.source.push(this.target[i]);
            }
            
            this.onMoveToSource.emit({
                items: this.target
            });
            
            this.onMoveAllToSource.emit({
                items: this.target
            });
            
            this.target.splice(0, this.target.length);
            
            this.selectedItemsTarget = [];
        }
    }

    isSelected(item: any, selectedItems: any[]) {
        return this.findIndexInSelection(item, selectedItems) != -1;
    }
    
    findIndexInSelection(item: any, selectedItems: any[]): number {
        return this.findIndexInList(item, selectedItems);
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
    
    onDragStart(event: DragEvent, index: number, listType: number) {
        this.dragging = true;
        this.fromListType = listType;
        if(listType === -1)
            this.draggedItemIndexSource = index;
        else
            this.draggedItemIndexTarget = index;
                        
        if(this.dragdropScope) {
            console.log
            event.dataTransfer.setData("text", this.dragdropScope);
        }
    }
    
    onDragOver(event: DragEvent, index: number, listType: number) {        
        if(listType == -1) {
            if(this.draggedItemIndexSource !== index && this.draggedItemIndexSource + 1 !== index || (this.fromListType === 1)) {
                this.dragOverItemIndexSource = index;
                event.preventDefault();
            }
        }
        else {
            if(this.draggedItemIndexTarget !== index && this.draggedItemIndexTarget + 1 !== index || (this.fromListType === -1)) {
                this.dragOverItemIndexTarget = index;
                event.preventDefault();
            }
        }
    }
    
    onDragLeave(event: DragEvent, listType: number) {
        this.dragOverItemIndexSource = null; 
        this.dragOverItemIndexTarget = null;
    }
    
    onDrop(event: DragEvent, index: number, listType: number) {            
        if(listType === -1) {
            if(this.fromListType === 1)
                this.insert(this.draggedItemIndexTarget, this.target, index, this.source);
            else
                this.objectUtils.reorderArray(this.source, this.draggedItemIndexSource, (this.draggedItemIndexSource > index) ? index : (index === 0) ? 0 : index - 1);

            this.dragOverItemIndexSource = null;
        }
        else {
            if(this.fromListType === -1)
                this.insert(this.draggedItemIndexSource, this.source, index, this.target);
            else
                this.objectUtils.reorderArray(this.target, this.draggedItemIndexTarget, (this.draggedItemIndexTarget > index) ? index : (index === 0) ? 0 : index - 1);
                
            this.dragOverItemIndexTarget = null;
        }
        
        event.preventDefault();
    }
    
    onDragEnd(event: DragEvent) {
        this.dragging = false;
    }
    
    onEmptyListDrop(event: DragEvent, listType: number) {
        if(listType === -1)
            this.insert(this.draggedItemIndexTarget, this.target, null, this.source);
        else
            this.insert(this.draggedItemIndexSource, this.source, null, this.target);
            
        event.preventDefault();
    }
    
    onEmptyListDragOver(event: DragEvent, listType: number) {
        event.preventDefault();
    }
    
    insert(fromIndex, fromList, toIndex, toList) {
        if(toIndex === null)
            toList.push(fromList.splice(fromIndex, 1)[0]);
        else
            toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0]);
    }
    
    onListMouseMove(event: MouseEvent, listType: number) {
        if(this.dragging) {
            let moveListType = (listType == 0 ? this.listViewSourceChild : this.listViewTargetChild);
            let offsetY = moveListType.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + moveListType.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if(bottomDiff < 25 && bottomDiff > 0)
                moveListType.nativeElement.scrollTop += 15;
            else if(topDiff < 25 && topDiff > 0)
                moveListType.nativeElement.scrollTop -= 15;
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule],
    exports: [PickList,SharedModule],
    declarations: [PickList]
})
export class PickListModule { }
