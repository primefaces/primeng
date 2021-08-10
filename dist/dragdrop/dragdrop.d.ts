import { OnDestroy, AfterViewInit, ElementRef, EventEmitter, NgZone } from '@angular/core';
export declare class Draggable implements AfterViewInit, OnDestroy {
    el: ElementRef;
    zone: NgZone;
    scope: string;
    dragEffect: string;
    dragHandle: string;
    onDragStart: EventEmitter<any>;
    onDragEnd: EventEmitter<any>;
    onDrag: EventEmitter<any>;
    handle: any;
    dragListener: any;
    mouseDownListener: any;
    mouseUpListener: any;
    _pDraggableDisabled: boolean;
    constructor(el: ElementRef, zone: NgZone);
    get pDraggableDisabled(): boolean;
    set pDraggableDisabled(_pDraggableDisabled: boolean);
    ngAfterViewInit(): void;
    bindDragListener(): void;
    unbindDragListener(): void;
    bindMouseListeners(): void;
    unbindMouseListeners(): void;
    drag(event: any): void;
    dragStart(event: any): void;
    dragEnd(event: any): void;
    mousedown(event: any): void;
    mouseup(event: any): void;
    allowDrag(): boolean;
    ngOnDestroy(): void;
}
export declare class Droppable implements AfterViewInit, OnDestroy {
    el: ElementRef;
    zone: NgZone;
    scope: string | string[];
    pDroppableDisabled: boolean;
    dropEffect: string;
    onDragEnter: EventEmitter<any>;
    onDragLeave: EventEmitter<any>;
    onDrop: EventEmitter<any>;
    constructor(el: ElementRef, zone: NgZone);
    dragOverListener: any;
    ngAfterViewInit(): void;
    bindDragOverListener(): void;
    unbindDragOverListener(): void;
    dragOver(event: any): void;
    drop(event: any): void;
    dragEnter(event: any): void;
    dragLeave(event: any): void;
    allowDrop(event: any): boolean;
    ngOnDestroy(): void;
}
export declare class DragDropModule {
}
