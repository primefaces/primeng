import {NgModule,Component,ElementRef,AfterViewChecked,AfterContentInit,Input,Output,ContentChildren,QueryList,TemplateRef,EventEmitter,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-widget':true,'ui-orderlist-responsive':responsive}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-orderlist-controls">
                <button type="button" pButton icon="fa-angle-up" (click)="moveUp($event,listelement)"></button>
                <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop($event,listelement)"></button>
                <button type="button" pButton icon="fa-angle-down" (click)="moveDown($event,listelement)"></button>
                <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom($event,listelement)"></button>
            </div>
            <div class="ui-orderlist-list-container">
                <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                <div class="ui-orderlist-filter-container ui-widget-content" *ngIf="filterBy">
                    <input type="text" role="textbox" (keyup)="onFilterKeyup($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder">
                    <span class="ui-orderlist-filter-icon fa fa-search"></span>
                </div>
                <ul #listelement class="ui-widget-content ui-orderlist-list ui-corner-bottom" [ngStyle]="listStyle" (dragover)="onListMouseMove($event)">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li class="ui-orderlist-droppoint" *ngIf="dragdrop && isItemVisible(item)" (dragover)="onDragOver($event, i)" (drop)="onDrop($event, i)" (dragleave)="onDragLeave($event)" 
                            [ngClass]="{'ui-state-highlight': (i === dragOverItemIndex)}"></li>
                        <li class="ui-orderlist-item"
                            [ngClass]="{'ui-state-highlight':isSelected(item)}" 
                            (click)="onItemClick($event,item,i)" (touchend)="onItemTouchEnd($event)"
                            [style.display]="isItemVisible(item) ? 'block' : 'none'"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="ui-orderlist-droppoint" *ngIf="dragdrop && l" (dragover)="onDragOver($event, i + 1)" (drop)="onDrop($event, i + 1)" (dragleave)="onDragLeave($event)" 
                            [ngClass]="{'ui-state-highlight': (i + 1 === dragOverItemIndex)}"></li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `,
    providers: [DomHandler,ObjectUtils]
})
export class OrderList implements AfterViewChecked,AfterContentInit {
    
    @Input() header: string;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() listStyle: any;
    
    @Input() responsive: boolean;
    
    @Input() filterBy: string;
    
    @Input() filterPlaceholder: string;
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() dragdrop: boolean;
    
    @Input() dragdropScope: string;

    @Input() trackBy: Function = (index: number, item: any) => item;
    
    @Output() onReorder: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFilterEvent: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('listelement') listViewChild: ElementRef;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;
        
    selectedItems: any[];
        
    movedUp: boolean;
    
    movedDown: boolean;
        
    listContainer: any;
    
    itemTouched: boolean;
    
    draggedItemIndex: number;
    
    dragOverItemIndex: number;
    
    dragging: boolean;
    
    public filterValue: string;
    
    public visibleOptions: any[];
    
    public _value: any[];
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}
         
    ngAfterViewInit() {
        this.listContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-orderlist-list');
    }
    
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
            let listItems = this.domHandler.find(this.listContainer, 'li.ui-state-highlight');
            let listItem;
            
            if(listItems.length > 0) {
                if(this.movedUp)
                    listItem = listItems[0];
                else
                    listItem = listItems[listItems.length - 1];
                
                this.domHandler.scrollInView(this.listContainer, listItem);
            }
            this.movedUp = false;
            this.movedDown = false;
        }
    }
    
    get value(): any[] {
        return this._value;
    }

    @Input() set value(val:any[]) {
        this._value = val;
        if(this.filterValue) {
            this.filter();
        }
    }
                
    onItemClick(event, item, index) {
        let selectedIndex = this.objectUtils.findIndexInList(item, this.selectedItems);
        let selected = (selectedIndex != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        
        if(metaSelection) {
            let metaKey = (event.metaKey||event.ctrlKey);
            
            if(selected && metaKey) {
                this.selectedItems.splice(selectedIndex, 1);
            }
            else {
                this.selectedItems = (metaKey) ? this.selectedItems||[] : [];            
                this.selectItem(item, index);
            }
        }
        else {
            if(selected) {
                this.selectedItems.splice(selectedIndex, 1);
            }
            else {
                this.selectedItems = this.selectedItems||[];
                this.selectItem(item, index);
            }
        }
        
        this.onSelectionChange.emit({originalEvent:event, value:this.selectedItems});
        this.itemTouched = false;
    }
    
    selectItem(item, index) {
        this.selectedItems = this.selectedItems||[];
        this.objectUtils.insertIntoOrderedArray(item, index, this.selectedItems, this.value);        
    }
        
    onFilterKeyup(event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.filter();
        
        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    }
    
    filter() {
        let searchFields: string[] = this.filterBy.split(',');
        this.visibleOptions = this.objectUtils.filter(this.value, searchFields, this.filterValue);
    }
    
    isItemVisible(item: any): boolean {
        if(this.filterValue && this.filterValue.trim().length) {
            for(let i = 0; i < this.visibleOptions.length; i++) {
                if(item == this.visibleOptions[i]) {
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
    
    isSelected(item: any) {
        return this.objectUtils.findIndexInList(item, this.selectedItems) != -1;
    }
        
    moveUp(event,listElement) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

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
            
            this.movedUp = true;
            this.onReorder.emit(event);
        }
    }
    
    moveTop(event,listElement) {
        if(this.selectedItems) {
            for(let i = 0; i < this.selectedItems.length; i++) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

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
            listElement.scrollTop = 0;
        }
    }
    
    moveDown(event,listElement) {
        if(this.selectedItems) {
            for(let i = this.selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

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
            
            this.movedDown = true;
            this.onReorder.emit(event);
        }
    }
    
    moveBottom(event,listElement) {
        if(this.selectedItems) {
            for(let i = this.selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = this.selectedItems[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

                if(selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value.splice(selectedItemIndex,1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
            listElement.scrollTop = listElement.scrollHeight;
        }
    }
    
    onDragStart(event: DragEvent, index: number) {
        this.dragging = true;
        this.draggedItemIndex = index;
        if(this.dragdropScope) {
            event.dataTransfer.setData("text", this.dragdropScope);
        }
    }
    
    onDragOver(event: DragEvent, index: number) {
        if(this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    }
    
    onDragLeave(event: DragEvent) {
        this.dragOverItemIndex = null;
    }
    
    onDrop(event: DragEvent, index: number) {
        let dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        this.objectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
        this.dragOverItemIndex = null;
        this.onReorder.emit(event);
        event.preventDefault();
    }
    
    onDragEnd(event: DragEvent) {
        this.dragging = false;
    }
    
    onListMouseMove(event: MouseEvent) {
        if(this.dragging) {
            let offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if(bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if(topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule],
    exports: [OrderList,SharedModule],
    declarations: [OrderList]
})
export class OrderListModule { }
