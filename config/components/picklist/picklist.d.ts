import { ElementRef, OnDestroy, AfterContentInit, AfterViewChecked, QueryList, TemplateRef, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class PickList implements OnDestroy, AfterViewChecked, AfterContentInit {
    el: ElementRef;
    domHandler: DomHandler;
    source: any[];
    target: any[];
    sourceHeader: string;
    targetHeader: string;
    responsive: boolean;
    metaKeySelection: boolean;
    style: any;
    styleClass: string;
    sourceStyle: any;
    targetStyle: any;
    showSourceControls: boolean;
    showTargetControls: boolean;
    onMoveToSource: EventEmitter<any>;
    onMoveToTarget: EventEmitter<any>;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    selectedItemsSource: any[];
    selectedItemsTarget: any[];
    reorderedListElement: any;
    movedUp: boolean;
    movedDown: boolean;
    itemTouched: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    onItemClick(event: any, item: any, selectedItems: any[]): void;
    onItemTouchEnd(event: any): void;
    moveUp(listElement: any, list: any, selectedItems: any): void;
    moveTop(listElement: any, list: any, selectedItems: any): void;
    moveDown(listElement: any, list: any, selectedItems: any): void;
    moveBottom(listElement: any, list: any, selectedItems: any): void;
    moveRight(targetListElement: any): void;
    moveAllRight(): void;
    moveLeft(sourceListElement: any): void;
    moveAllLeft(): void;
    isSelected(item: any, selectedItems: any[]): boolean;
    findIndexInSelection(item: any, selectedItems: any[]): number;
    findIndexInList(item: any, list: any): number;
    ngOnDestroy(): void;
}
export declare class PickListModule {
}
