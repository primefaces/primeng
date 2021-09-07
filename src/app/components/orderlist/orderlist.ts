import {NgModule,Component,ElementRef,AfterViewChecked,AfterContentInit,Input,Output,ContentChildren,QueryList,TemplateRef,EventEmitter,ViewChild,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SharedModule,PrimeTemplate,FilterService} from 'primeng/api';
import {DomHandler} from 'primeng/dom';
import {ObjectUtils, UniqueComponentId} from 'primeng/utils';
import {RippleModule} from 'primeng/ripple';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'p-orderList',
    template: `
        <div [ngClass]="{'p-orderlist p-component': true, 'p-orderlist-controls-left': controlsPosition === 'left',
                    'p-orderlist-controls-right': controlsPosition === 'right'}" [ngStyle]="style" [class]="styleClass">
            <div class="p-orderlist-controls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" (click)="moveUp()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" (click)="moveTop()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" (click)="moveDown()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" (click)="moveBottom()"></button>
            </div>
            <div class="p-orderlist-list-container">
                <div class="p-orderlist-header" *ngIf="header || headerTemplate">
                    <div class="p-orderlist-title" *ngIf="!headerTemplate">{{header}}</div>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
                <div class="p-orderlist-filter-container" *ngIf="filterBy">
                    <div class="p-orderlist-filter">
                        <input type="text" role="textbox" (keyup)="onFilterKeyup($event)" class="p-orderlist-filter-input p-inputtext p-component" [attr.placeholder]="filterPlaceholder" [attr.aria-label]="ariaFilterLabel">
                        <span class="p-orderlist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <ul #listelement cdkDropList (cdkDropListDropped)="onDrop($event)" class="p-orderlist-list" [ngStyle]="listStyle">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li class="p-orderlist-item" tabindex="0" [ngClass]="{'p-highlight':isSelected(item)}" cdkDrag pRipple [cdkDragData]="item" [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event,item,i)" (touchend)="onItemTouchEnd()" (keydown)="onItemKeydown($event,item,i)"
                             *ngIf="isItemVisible(item)" role="option" [attr.aria-selected]="isSelected(item)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty() && (emptyMessageTemplate || emptyFilterMessageTemplate)">
                        <li *ngIf="!filterValue || !emptyFilterMessageTemplate" class="p-orderlist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
                        </li>
                        <li *ngIf="filterValue" class="p-orderlist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./orderlist.css'],
    host: {
        'class': 'p-element'
    }
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

    @Input() dragdrop: boolean = false;

    @Input() controlsPosition: string = 'left';

    @Input() ariaFilterLabel: string;

    @Input() filterMatchMode: string = "contains";

    @Input() breakpoint: string = "960px";

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() trackBy: Function = (index: number, item: any) => item;

    @Output() onReorder: EventEmitter<any> = new EventEmitter();

    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();

    @Output() onFilterEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild('listelement') listViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;

    public emptyMessageTemplate: TemplateRef<any>;

    public emptyFilterMessageTemplate: TemplateRef<any>;

    _selection: any[];

    movedUp: boolean;

    movedDown: boolean;

    itemTouched: boolean;

    styleElement: any;

    id: string = UniqueComponentId();

    public filterValue: string;

    public visibleOptions: any[];

    public _value: any[];

    constructor(public el: ElementRef, public cd: ChangeDetectorRef, public filterService: FilterService) {}

    get selection(): any[] {
        return this._selection;
    }

    @Input() set selection(val:any[]) {
        this._selection = val;
    }

    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'empty':
                    this.emptyMessageTemplate = item.template;
                break;

                case 'emptyfilter':
                    this.emptyFilterMessageTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
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
        this.visibleOptions = this.filterService.filter(this.value, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
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

    onItemTouchEnd() {
        this.itemTouched = true;
    }

    isSelected(item: any) {
        return ObjectUtils.findIndexInList(item, this.selection) != -1;
    }

    isEmpty() {
        return this.filterValue ? (!this.visibleOptions || this.visibleOptions.length === 0) : (!this.value || this.value.length === 0);
    }

    moveUp() {
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

            if (this.dragdrop && this.filterValue)
                this.filter();

            this.movedUp = true;
            this.onReorder.emit(this.selection);
        }
    }

    moveTop() {
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

            if (this.dragdrop && this.filterValue)
                this.filter();

            this.onReorder.emit(this.selection);
            this.listViewChild.nativeElement.scrollTop = 0;
        }
    }

    moveDown() {
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

            if (this.dragdrop && this.filterValue)
                this.filter();

            this.movedDown = true;
            this.onReorder.emit(this.selection);
        }
    }

    moveBottom() {
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

            if (this.dragdrop && this.filterValue)
                this.filter();

            this.onReorder.emit(this.selection);
            this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
        }
    }

    onDrop(event: CdkDragDrop<string[]>) {
        let previousIndex =  event.previousIndex;
        let currentIndex = event.currentIndex;

        if (previousIndex !== currentIndex) {

            if (this.visibleOptions) {
                if (this.filterValue) {
                    previousIndex =  ObjectUtils.findIndexInList(event.item.data, this.value);
                    currentIndex = ObjectUtils.findIndexInList(this.visibleOptions[currentIndex], this.value);
                }

                moveItemInArray(this.visibleOptions, event.previousIndex, event.currentIndex);
            }

            moveItemInArray(this.value, previousIndex, currentIndex);
            this.onReorder.emit([event.item.data]);
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

    createStyle() {
        if (!this.styleElement) {
            this.el.nativeElement.children[0].setAttribute(this.id, '');
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);

            let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-orderlist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-orderlist[${this.id}] .p-orderlist-controls {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }

                    .p-orderlist[${this.id}] .p-orderlist-controls .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }

                    .p-orderlist[${this.id}] .p-orderlist-controls .p-button:last-child {
                        margin-right: 0;
                    }
                }
            `;

            this.styleElement.innerHTML = innerHTML;
        }
    }

    destroyStyle() {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;``
        }
    }

    ngOnDestroy() {
        this.destroyStyle();
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule,RippleModule,DragDropModule],
    exports: [OrderList,SharedModule,DragDropModule],
    declarations: [OrderList]
})
export class OrderListModule { }
