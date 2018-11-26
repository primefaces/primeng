import { NgModule, Component, ElementRef, AfterViewChecked, AfterContentInit, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter,
    ViewChild, HostListener } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'ui-orderlist ui-widget': true, 'ui-orderlist-controls-left': controlsPosition === 'left',
                    'ui-orderlist-controls-right': controlsPosition === 'right'}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-orderlist-controls">
                <button type="button" pButton icon="pi pi-angle-up" (click)="moveUp($event)"></button>
                <button type="button" pButton icon="pi pi-angle-double-up" (click)="moveTop($event)"></button>
                <button type="button" pButton icon="pi pi-angle-down" (click)="moveDown($event)"></button>
                <button type="button" pButton icon="pi pi-angle-double-down" (click)="moveBottom($event)"></button>
            </div>
            <div class="ui-orderlist-list-container">
                <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                <div class="ui-orderlist-filter-container ui-widget-content" *ngIf="filterBy">
                    <input type="text" role="textbox" (keyup)="onFilterKeyup($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder">
                    <span class="ui-orderlist-filter-icon pi pi-search"></span>
                </div>
                <ul #listelement class="ui-widget-content ui-orderlist-list ui-corner-bottom" [ngStyle]="listStyle" (dragover)="onListMouseMove($event)">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li class="ui-orderlist-droppoint" *ngIf="dragdrop && isItemVisible(item)" (dragover)="onDragOver($event, i)" (drop)="onDrop($event, i)" (dragleave)="onDragLeave($event)" 
                            [ngClass]="{'ui-orderlist-droppoint-highlight': (i === dragOverItemIndex)}"></li>
                        <li class="ui-orderlist-item" [attr.tabindex]="0"
                            [ngClass]="{'ui-state-highlight':isSelected(item)}" 
                            (click)="onItemClick($event,item,i)" (touchend)="onItemTouchEnd($event)"
                            [style.display]="isItemVisible(item) ? 'block' : 'none'"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="ui-orderlist-droppoint" *ngIf="dragdrop && l" (dragover)="onDragOver($event, i + 1)" (drop)="onDrop($event, i + 1)" (dragleave)="onDragLeave($event)" 
                            [ngClass]="{'ui-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}"></li>
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

    @Input() controlsPosition: string = 'left';

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() trackBy: Function = (index: number, item: any) => item;
    
    @Output() onReorder: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFilterEvent: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('listelement') listViewChild: ElementRef;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;
        
    _selection: any[];
        
    movedUp: boolean;
    
    movedDown: boolean;
            
    itemTouched: boolean;
    
    draggedItemIndex: number;
    
    dragOverItemIndex: number;
    
    dragging: boolean;
    
    focusedIndex: number;
    
    focusedOption: any;
    
    public filterValue: string;
    
    public visibleOptions: any[];
    
    public _value: any[];
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}

    get selection(): any[] {
        return this._selection;
    }

    @Input() set selection(val:any[]) {
        this._selection = val;
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
        if (this.movedUp||this.movedDown) {
            let listItems = this.domHandler.find(this.listViewChild.nativeElement, 'li.ui-state-highlight');
            let listItem;
            
            if (listItems.length > 0) {
                if (this.movedUp)
                    listItem = listItems[0];
                else
                    listItem = listItems[listItems.length - 1];
                
                this.domHandler.scrollInView(this.listViewChild.nativeElement, listItem);
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
        if (this.filterValue) {
            this.filter();
        }
    }
                
    onItemClick(event, item, index) {
        this.itemTouched = false;
        let selectedIndex = this.objectUtils.findIndexInList(item, this.selection);
        let selected = (selectedIndex != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        
        if (metaSelection) {
            let metaKey = (event.metaKey||event.ctrlKey);
            
            if (selected && metaKey) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = (metaKey) ? this._selection ? [...this._selection] : [] : [];            
                this.objectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);    
            }
        }
        else {
            if (selected) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = this._selection ? [...this._selection] : [];
                this.objectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);    
            }
        }
        
        this.focusedOption = item;
        
        //binding
        this.selectionChange.emit(this._selection);

        //event
        this.onSelectionChange.emit({originalEvent:event, value: this._selection});   
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
        this.focusedOption = null;
        this.focusedIndex = null;
    }
    
    isItemVisible(item: any): boolean {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (item == this.visibleOptions[i]) {
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
        return this.objectUtils.findIndexInList(item, this.selection) != -1;
    }
        
    moveUp(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex != 0) {
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
    
    moveTop(event) {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex != 0) {
                    let movedItem = this.value.splice(selectedItemIndex,1)[0];
                    this.value.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = 0;
        }
    }
    
    moveDown(event) {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex != (this.value.length - 1)) {
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
    
    moveBottom(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = this.objectUtils.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value.splice(selectedItemIndex,1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
        }
    }
    
    onDragStart(event: DragEvent, index: number) {
        (<HTMLLIElement> event.target).blur();
        this.dragging = true;
        this.draggedItemIndex = index;
        if (this.dragdropScope) {
            event.dataTransfer.setData("text", this.dragdropScope);
        }
    }
    
    onDragOver(event: DragEvent, index: number) {
        if (this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
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
        if (this.dragging) {
            let offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    }
    
    @HostListener('keydown',['$event'])
    onKeyDown(event:KeyboardEvent){
        
        let opts = this.filterValue ? this.visibleOptions : this.value;
        let currentOption = <HTMLLIElement>event.target;
        this.focusedIndex = this.domHandler.indexWithDisplay(currentOption);
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
                    this.onItemClick(event, this.focusedOption, this.focusedIndex);
                }
                event.preventDefault();
                break;
        }
    }
    
    findPrevOption(row)  {
        let prevOption = row.previousElementSibling;
        if (prevOption) {
            if (this.domHandler.hasClass(prevOption, 'ui-orderlist-item') && prevOption.style.display == 'block')
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
            if (this.domHandler.hasClass(nextOption, 'ui-orderlist-item') && nextOption.style.display == 'block')
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
    exports: [OrderList,SharedModule],
    declarations: [OrderList]
})
export class OrderListModule { }
