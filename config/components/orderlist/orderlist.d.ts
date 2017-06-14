import { ElementRef, AfterViewChecked, AfterContentInit, QueryList, TemplateRef, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class OrderList implements AfterViewChecked, AfterContentInit {
    el: ElementRef;
    domHandler: DomHandler;
    value: any[];
    header: string;
    style: any;
    styleClass: string;
    listStyle: any;
    responsive: boolean;
    metaKeySelection: boolean;
    onReorder: EventEmitter<any>;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    selectedItems: any[];
    movedUp: boolean;
    movedDown: boolean;
    listContainer: any;
    itemTouched: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    onItemClick(event: any, item: any): void;
    onItemTouchEnd(event: any): void;
    isSelected(item: any): boolean;
    findIndexInList(item: any, list: any): number;
    moveUp(event: any, listElement: any): void;
    moveTop(event: any, listElement: any): void;
    moveDown(event: any, listElement: any): void;
    moveBottom(event: any, listElement: any): void;
}
export declare class OrderListModule {
}
