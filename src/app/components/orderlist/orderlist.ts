import {NgModule,Component,ElementRef,AfterViewChecked,AfterContentInit,Input,Output,ContentChildren,QueryList,TemplateRef,EventEmitter,ViewChild,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SharedModule,PrimeTemplate} from 'primeng/api';
import {DomHandler} from 'primeng/dom';
import {ObjectUtils} from 'primeng/utils';
import {FilterUtils} from 'primeng/utils';
import {RippleModule} from 'primeng/ripple';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'p-orderlist p-component': true, 'p-orderlist-controls-left': controlsPosition === 'left',
                    'p-orderlist-controls-right': controlsPosition === 'right'}" [ngStyle]="style" [class]="styleClass">
            <div class="p-orderlist-controls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" (click)="moveUp($event)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" (click)="moveTop($event)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" (click)="moveDown($event)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" (click)="moveBottom($event)"></button>
            </div>
            <div class="p-orderlist-list-container">
                <div class="p-orderlist-header" *ngIf="header">
                    <div class="p-orderlist-title">{{header}}</div>
                </div>
                <div class="p-orderlist-filter-container" *ngIf="filterBy">
                    <div class="p-orderlist-filter">
                        <input type="text" role="textbox" (keyup)="onFilterKeyup($event)" class="p-orderlist-filter-input p-inputtext p-component" [attr.placeholder]="filterPlaceholder" [attr.aria-label]="ariaFilterLabel">
                        <span class="p-orderlist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <ul #listelement class="p-orderlist-list" [ngStyle]="listStyle" (dragover)="onListMouseMove($event)">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li class="p-orderlist-droppoint" *ngIf="dragdrop && isItemVisible(item)" (dragover)="onDragOver($event, i)" (drop)="onDrop($event, i)" (dragleave)="onDragLeave($event)"
                            [ngClass]="{'p-orderlist-droppoint-highlight': (i === dragOverItemIndex)}"></li>
                        <li class="p-orderlist-item" tabindex="0" [ngClass]="{'p-highlight':isSelected(item)}" pRipple
                            (click)="onItemClick($event,item,i)" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,i)"
                            [style.display]="isItemVisible(item) ? 'block' : 'none'" role="option" [attr.aria-selected]="isSelected(item)"
                            [attr.draggable]="dragdrop" (dragstart)="onDragStart($event, i)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="p-orderlist-droppoint" *ngIf="dragdrop && l" (dragover)="onDragOver($event, i + 1)" (drop)="onDrop($event, i + 1)" (dragleave)="onDragLeave($event)"
                            [ngClass]="{'p-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}"></li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./orderlist.css']
})
export class OrderList implements AfterViewChecked,AfterContentInit {

    @Input() header: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() listStyle: any;

    @Input() responsive: boolean;

    @Input() filterBy: string;

    @Input() filterPlaceholder: string;

    @Input() filterLocale: string;

    @Input() metaKeySelection: boolean = true;

    @Input() dragdrop: boolean;

    @Input() controlsPosition: string = 'left';

    @Input() ariaFilterLabel: string;

    @Input() filterMatchMode: string = "contains";

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

    public filterValue: string;

    public visibleOptions: any[];

    public _value: any[];

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}

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
            let listItems = DomHandler.find(this.listViewChild.nativeElement, 'li.p-highlight');
            let listItem;

            if (listItems.length > 0) {
                if (this.movedUp)
                    listItem = listItems[0];
                else
                    listItem = listItems[listItems.length - 1];

                DomHandler.scrollInView(this.listViewChild.nativeElement, listItem);
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
        let selectedIndex = ObjectUtils.findIndexInList(item, this.selection);
        let selected = (selectedIndex != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            let metaKey = (event.metaKey||event.ctrlKey||event.shiftKey);

            if (selected && metaKey) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = (metaKey) ? this._selection ? [...this._selection] : [] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        else {
            if (selected) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = this._selection ? [...this._selection] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }

        //binding
        this.selectionChange.emit(this._selection);

        //event
        this.onSelectionChange.emit({originalEvent:event, value: this._selection});
    }

    onFilterKeyup(event) {
        this.filterValue = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter();

        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    }

    filter() {
        let searchFields: string[] = this.filterBy.split(',');
        this.visibleOptions = FilterUtils.filter(this.value, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
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
        return ObjectUtils.findIndexInList(item, this.selection) != -1;
    }

    moveUp(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

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
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

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
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

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
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

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
        event.dataTransfer.setData('text', 'b');    // For firefox
        (<HTMLLIElement> event.target).blur();
        this.dragging = true;
        this.draggedItemIndex = index;
    }

    onDragOver(event: DragEvent, index: number) {
        if (this.dragging && this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    }

    onDragLeave(event: DragEvent) {
        this.dragOverItemIndex = null;
    }

    onDrop(event: DragEvent, index: number) {
        let dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        ObjectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
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

    onItemKeydown(event: KeyboardEvent, item, index: Number) {
        let listItem = <HTMLLIElement> event.currentTarget;

        switch(event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }

                event.preventDefault();
            break;

            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }

                event.preventDefault();
            break;

            //enter
            case 13:
                this.onItemClick(event, item, index);
                event.preventDefault();
            break;
        }
    }

    findNextItem(item) {
        let nextItem = item.nextElementSibling;

        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-orderlist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }

    findPrevItem(item) {
        let prevItem = item.previousElementSibling;

        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-orderlist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule,RippleModule],
    exports: [OrderList,SharedModule],
    declarations: [OrderList]
})
export class OrderListModule { }
