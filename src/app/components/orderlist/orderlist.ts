import {NgModule,Component,ElementRef,AfterViewChecked,AfterContentInit,Input,Output,ContentChildren,QueryList,TemplateRef,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/ObjectUtils';

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
                <div class="ui-orderlist-filter-container" *ngIf="filter">
                    <input type="text" role="textbox" (keyup)="onFilter($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled">
                    <span class="fa fa-search"></span>
                </div>
                <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                <ul #listelement class="ui-widget-content ui-orderlist-list ui-corner-bottom" [ngStyle]="listStyle">
                    <li *ngFor="let item of value" class="ui-orderlist-item"
                        [ngClass]="{'ui-state-highlight':isSelected(item)}" 
                        (click)="onItemClick($event,item)" (touchend)="onItemTouchEnd($event)"
                        [style.display]="isItemVisible(item) ? 'block' : 'none'">
                        <ng-template [pTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
                    </li>
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
    
    @Input() filter: boolean = false;
    
    @Input() metaKeySelection: boolean = true;
    
    @Output() onReorder: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFilterEvent: EventEmitter<any> = new EventEmitter();
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;
        
    selectedItems: any[];
    
    movedUp: boolean;
    
    movedDown: boolean;
        
    listContainer: any;
    
    itemTouched: boolean;
    
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
            
            if(this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            
            this.domHandler.scrollInView(this.listContainer, listItem);
            this.movedUp = false;
            this.movedDown = false;
        }
    }
    
    get value(): any[] {
        return this._value;
    }

    @Input()set value(val:any[]) {
        this._value = val ? [...val] : null;
        if(this.filterValue) {
            this.activateFilter();
        }
    }
                
    onItemClick(event, item) {
        let index = this.findIndexInList(item, this.selectedItems);
        let selected = (index != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        
        if(metaSelection) {
            let metaKey = (event.metaKey||event.ctrlKey);
            
            if(selected && metaKey) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems = (metaKey) ? this.selectedItems||[] : [];            
                this.selectedItems.push(item);
            }
        }
        else {
            if(selected) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems = this.selectedItems||[];
                this.selectedItems.push(item);
            }
        }

        this.onSelectionChange.emit({originalEvent:event, value:this.selectedItems});
        this.itemTouched = false;
    }
    
    onFilter(event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        this.activateFilter();
        
        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    }
    
    activateFilter() {
        let searchFields = this.filterBy.split(',');
        this.visibleOptions = this.objectUtils.filter(this.value, searchFields, this.filterValue);
    }
    
    isItemVisible(item: any): boolean {
        let filterFields = this.filterBy.split(',');
        
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
            
            this.movedUp = true;
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
            listElement.scrollTop = 0;
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
            
            this.movedDown = true;
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
            listElement.scrollTop = listElement.scrollHeight;
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule],
    exports: [OrderList,SharedModule],
    declarations: [OrderList]
})
export class OrderListModule { }