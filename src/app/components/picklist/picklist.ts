import { NgModule, Component, ElementRef, AfterContentInit, AfterViewChecked, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild, HostListener} from '@angular/core';
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
                    <button type="button" pButton icon="pi pi-angle-up" [disabled]="disabled" (click)="moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                    <button type="button" pButton icon="pi pi-angle-double-up" [disabled]="disabled" (click)="moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                    <button type="button" pButton icon="pi pi-angle-down" [disabled]="disabled" (click)="moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                    <button type="button" pButton icon="pi pi-angle-double-down" [disabled]="disabled" (click)="moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-source-wrapper" [ngClass]="{'ui-picklist-listwrapper-nocontrols':!showSourceControls}">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="sourceHeader">{{sourceHeader}}</div>
                <div class="ui-picklist-filter-container ui-widget-content" *ngIf="filterBy && showSourceFilter !== false">
                    <input #sourceFilter type="text" role="textbox" (keyup)="onFilter($event,source,SOURCE_LIST)" class="ui-picklist-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled" [attr.placeholder]="sourceFilterPlaceholder">
                    <span class="ui-picklist-filter-icon pi pi-search"></span>
                </div>
                <ul #sourcelist class="ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom" [ngClass]="{'ui-picklist-highlight': listHighlightSource}" [ngStyle]="sourceStyle" (dragover)="onListMouseMove($event,SOURCE_LIST)" (dragleave)="onListDragLeave()" (drop)="onListDrop($event, SOURCE_LIST)">
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, SOURCE_LIST)" (drop)="onDrop($event, i, SOURCE_LIST)" (dragleave)="onDragLeave($event, SOURCE_LIST)"
                        [ngClass]="{'ui-picklist-droppoint-highlight': (i === dragOverItemIndexSource)}" [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsSource), 'ui-state-disabled': disabled}"
                            (click)="onItemClick($event,item,selectedItemsSource,onSourceSelect)" (dblclick)="onSourceItemDblClick()" (touchend)="onItemTouchEnd($event)"
                            [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'" [attr.tabindex]="0"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i, SOURCE_LIST)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, SOURCE_LIST)" (drop)="onDrop($event, i + 1, SOURCE_LIST)" (dragleave)="onDragLeave($event, SOURCE_LIST)"
                        [ngClass]="{'ui-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexSource)}"></li>
                    </ng-template>
                </ul>
            </div>
            <div class="ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="pi pi-angle-right" [disabled]="disabled" (click)="moveRight()"></button>
                    <button type="button" pButton icon="pi pi-angle-double-right" [disabled]="disabled" (click)="moveAllRight()"></button>
                    <button type="button" pButton icon="pi pi-angle-left" [disabled]="disabled" (click)="moveLeft()"></button>
                    <button type="button" pButton icon="pi pi-angle-double-left" [disabled]="disabled" (click)="moveAllLeft()"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-target-wrapper" [ngClass]="{'ui-picklist-listwrapper-nocontrols':!showTargetControls}">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="targetHeader">{{targetHeader}}</div>
                <div class="ui-picklist-filter-container ui-widget-content" *ngIf="filterBy && showTargetFilter !== false">
                    <input #targetFilter type="text" role="textbox" (keyup)="onFilter($event,target,TARGET_LIST)" class="ui-picklist-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled" [attr.placeholder]="targetFilterPlaceholder">
                    <span class="ui-picklist-filter-icon pi pi-search"></span>
                </div>
                <ul #targetlist class="ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom" [ngClass]="{'ui-picklist-highlight': listHighlightTarget}" [ngStyle]="targetStyle" (dragover)="onListMouseMove($event,TARGET_LIST)" (dragleave)="onListDragLeave()" (drop)="onListDrop($event,TARGET_LIST)">
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, TARGET_LIST)" (drop)="onDrop($event, i, TARGET_LIST)" (dragleave)="onDragLeave($event, TARGET_LIST)"
                        [ngClass]="{'ui-picklist-droppoint-highlight': (i === dragOverItemIndexTarget)}" [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsTarget), 'ui-state-disabled': disabled}"
                            (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()" (touchend)="onItemTouchEnd($event)"
                            [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'" [attr.tabindex]="0"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i, TARGET_LIST)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="ui-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, TARGET_LIST)" (drop)="onDrop($event, i + 1, TARGET_LIST)" (dragleave)="onDragLeave($event, TARGET_LIST)"
                        [ngClass]="{'ui-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexTarget)}"></li>
                    </ng-template>
                </ul>
            </div>
            <div class="ui-picklist-target-controls ui-picklist-buttons" *ngIf="showTargetControls">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="pi pi-angle-up" [disabled]="disabled" (click)="moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                    <button type="button" pButton icon="pi pi-angle-double-up" [disabled]="disabled" (click)="moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                    <button type="button" pButton icon="pi pi-angle-down" [disabled]="disabled" (click)="moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                    <button type="button" pButton icon="pi pi-angle-double-down" [disabled]="disabled" (click)="moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
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

    @Input() trackBy: Function = (index: number, item: any) => item;

    @Input() sourceTrackBy: Function;

    @Input() targetTrackBy: Function;

    @Input() showSourceFilter: boolean = true;

    @Input() showTargetFilter: boolean = true;
    
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

    @Input() disabled: boolean = false;
    
    @Output() onMoveToSource: EventEmitter<any> = new EventEmitter();
    
    @Output() onMoveAllToSource: EventEmitter<any> = new EventEmitter();
    
    @Output() onMoveAllToTarget: EventEmitter<any> = new EventEmitter();
    
    @Output() onMoveToTarget: EventEmitter<any> = new EventEmitter();
    
    @Output() onSourceReorder: EventEmitter<any> = new EventEmitter();
    
    @Output() onTargetReorder: EventEmitter<any> = new EventEmitter();

    @Output() onSourceSelect: EventEmitter<any> = new EventEmitter();

    @Output() onTargetSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild('sourcelist') listViewSourceChild: ElementRef;
    
    @ViewChild('targetlist') listViewTargetChild: ElementRef;

    @ViewChild('sourceFilter') sourceFilterViewChild: ElementRef;

    @ViewChild('targetFilter') targetFilterViewChild: ElementRef;

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
    
    onListItemDroppoint: boolean;
    
    listHighlightTarget: boolean;
    
    listHighlightSource: boolean;
    
    focusedIndex: number;
    
    focusedOption: any;

    readonly SOURCE_LIST = -1;

    readonly TARGET_LIST = 1;

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
    
    onItemClick(event, item: any, selectedItems: any[], callback: EventEmitter<any>) {
        if(this.disabled) {
            return;
        }
        
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

        callback.emit({originalEvent: event, items: selectedItems});

        this.itemTouched = false;
    }
    
    onSourceItemDblClick() {
        if(this.disabled) {
            return;
        }
        
        this.moveRight();
    }
    
    onTargetItemDblClick() {
        if(this.disabled) {
            return;
        }
        
        this.moveLeft();
    }
    
    onFilter(event: KeyboardEvent, data: any[], listType: number) {
        let query = (<HTMLInputElement> event.target).value.trim().toLowerCase();
        
        if(listType === this.SOURCE_LIST)
            this.filterValueSource = query;
        else
            this.filterValueTarget = query;
                
        this.activateFilter(data, listType);
    }
    
    activateFilter(data: any[], listType: number) {
        let searchFields = this.filterBy.split(',');
        
        if(listType === this.SOURCE_LIST)
            this.visibleOptionsSource = this.objectUtils.filter(data, searchFields, this.filterValueSource);
        else
            this.visibleOptionsTarget = this.objectUtils.filter(data, searchFields, this.filterValueTarget);
    }
    
    isItemVisible(item: any, listType: number): boolean {
        if(listType == this.SOURCE_LIST)
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
        if(this.disabled) {
            return;
        }
        
        this.itemTouched = true;
    }

    private sortByIndexInList(items: any[], list: any) {
        return items.sort((item1, item2) =>
            this.findIndexInList(item1, list) - this.findIndexInList(item2, list));
    }

    moveUp(listElement, list, selectedItems, callback) {
        if(selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
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
            selectedItems = this.sortByIndexInList(selectedItems, list);
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
            selectedItems = this.sortByIndexInList(selectedItems, list);
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
            selectedItems = this.sortByIndexInList(selectedItems, list);
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

    moveRight() {
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
            let movedItems = [];
            
            for(let i = 0; i < this.source.length; i++) {                
                if(this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
                
            this.onMoveToTarget.emit({
                items: movedItems
            });
            
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            
            this.selectedItemsSource = [];
        }
    }

    moveLeft() {
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
            let movedItems = [];
            
            for(let i = 0; i < this.target.length; i++) {                
                if(this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
    
            this.onMoveToSource.emit({
                items: movedItems
            });
            
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            
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
        (<HTMLLIElement> event.target).blur();
        this.dragging = true;
        this.fromListType = listType;
        if(listType === this.SOURCE_LIST)
            this.draggedItemIndexSource = index;
        else
            this.draggedItemIndexTarget = index;
                        
        if(this.dragdropScope) {
            event.dataTransfer.setData("text", this.dragdropScope);
        }
    }
    
    onDragOver(event: DragEvent, index: number, listType: number) {
        if(listType == this.SOURCE_LIST) {
            if(this.draggedItemIndexSource !== index && this.draggedItemIndexSource + 1 !== index || (this.fromListType === this.TARGET_LIST)) {
                this.dragOverItemIndexSource = index;
                event.preventDefault();
            }
        }
        else {
            if(this.draggedItemIndexTarget !== index && this.draggedItemIndexTarget + 1 !== index || (this.fromListType === this.SOURCE_LIST)) {
                this.dragOverItemIndexTarget = index;
                event.preventDefault();
            }
        }
        this.onListItemDroppoint = true;
    }
    
    onDragLeave(event: DragEvent, listType: number) {
        this.dragOverItemIndexSource = null; 
        this.dragOverItemIndexTarget = null;
        this.onListItemDroppoint = false;
    }
    
    onDrop(event: DragEvent, index: number, listType: number) {
        if(this.onListItemDroppoint) {
            if(listType === this.SOURCE_LIST) {
                if(this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, index, this.source, this.onMoveToSource);
                }
                else {
                    this.objectUtils.reorderArray(this.source, this.draggedItemIndexSource, (this.draggedItemIndexSource > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onSourceReorder.emit({items: this.source[this.draggedItemIndexSource]});
                }

                this.dragOverItemIndexSource = null;
            }
            else {
                if(this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, index, this.target, this.onMoveToTarget);
                }
                else {
                    this.objectUtils.reorderArray(this.target, this.draggedItemIndexTarget, (this.draggedItemIndexTarget > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onTargetReorder.emit({items: this.target[this.draggedItemIndexTarget]});
                }
                    
                this.dragOverItemIndexTarget = null;
            }
            
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    }
    
    onDragEnd(event: DragEvent) {
        this.dragging = false;
    }
    
    onListDrop(event: DragEvent, listType:  number) {
        if(!this.onListItemDroppoint) {
            if(listType === this.SOURCE_LIST) {
                if(this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, null, this.source, this.onMoveToSource);
                }
            }
            else {
                if(this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, null, this.target, this.onMoveToTarget);
                }
            }
            
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    }
    
    insert(fromIndex, fromList, toIndex, toList, callback) {
        const elementtomove = fromList[fromIndex];
        
        if(toIndex === null)
            toList.push(fromList.splice(fromIndex, 1)[0]);
        else
            toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0]);
            
        callback.emit({
            items: [elementtomove]
        });
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
        
        if(listType === this.SOURCE_LIST) {
            if(this.fromListType === this.TARGET_LIST)
                this.listHighlightSource = true;
        }
        else {
            if(this.fromListType === this.SOURCE_LIST)
                this.listHighlightTarget = true;
        }
        event.preventDefault();
    }
    
    onListDragLeave() {
        this.listHighlightTarget = false;
        this.listHighlightSource = false;
    }

    resetFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;

        (<HTMLInputElement> this.sourceFilterViewChild.nativeElement).value = '';
        (<HTMLInputElement> this.targetFilterViewChild.nativeElement).value = '';
    }
    
    @HostListener('keydown',['$event'])
    onKeyDown(event:KeyboardEvent){
        let opts = [];
        let listType;
        let currentOption = <HTMLLIElement>event.target;
        
        if(this.domHandler.hasClass(currentOption.parentElement,'ui-picklist-source')) {
            opts = this.filterValueSource ? this.visibleOptionsSource : this.source;
            listType = -1;
        }
        else if(this.domHandler.hasClass(currentOption.parentElement,'ui-picklist-target')) {
            opts = this.filterValueTarget ? this.visibleOptionsTarget : this.target;
            listType = 1;
        }
    
        this.focusedIndex = this.indexWithDisplay(currentOption);
        this.focusedOption = opts[this.focusedIndex]
        
        switch(event.which) {
            //down
            case 40:
                this.focusedIndex = this.focusedIndex + 1;
                if (this.focusedIndex != (opts.length)) {
                    this.focusedOption = opts[this.focusedIndex];
                }
                let nextOption = this.findNextOption(currentOption);
                if(nextOption) {
                    nextOption.focus();
                }
                
                event.preventDefault();
                break;
            
            //up
            case 38:
                this.focusedIndex = this.focusedIndex - 1;
                this.focusedOption = opts[this.focusedIndex];
                let prevOption = this.findPrevOption(currentOption);
                if (prevOption) {
                    prevOption.focus();
                }
                
                event.preventDefault();
                break;
            
            //enter
            case 13:
                if (this.focusedOption) {
                    if(listType === this.SOURCE_LIST) {
                        this.onItemClick(event, this.focusedOption, this.selectedItemsSource, this.onSourceSelect);
                    }
                    else if( listType === this.TARGET_LIST) {
                        this.onItemClick(event, this.focusedOption, this.selectedItemsTarget, this.onTargetSelect);
                    }
                }
                event.preventDefault();
                break;
        }
    }
    
    indexWithDisplay(element: any): number {
        let children = element.parentNode.childNodes;
        let num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element && children[i].style.display == 'block' && this.domHandler.hasClass(children[i],'ui-picklist-item')) return num;
            if (children[i].nodeType == 1 && children[i].style.display == 'block' && this.domHandler.hasClass(children[i],'ui-picklist-item')) num++;
        }
        return -1;
    }
    
    findPrevOption(row)  {
        let prevOption = row.previousElementSibling;
        if (prevOption) {
            if (this.domHandler.hasClass(prevOption, 'ui-picklist-item') && prevOption.style.display == 'block')
                return prevOption;
            else
                return this.findPrevOption(prevOption);
        }
        else {
            return null;
        }
    }
    
    findNextOption(row) {
        let nextOption = row.nextElementSibling;
        if (nextOption) {
            if (this.domHandler.hasClass(nextOption, 'ui-picklist-item') && nextOption.style.display == 'block')
                return nextOption;
            else
                return this.findNextOption(nextOption);
        }
        else {
            return null;
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule],
    exports: [PickList,SharedModule],
    declarations: [PickList]
})
export class PickListModule { }
