import { ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class ContextMenuSub {
    domHandler: DomHandler;
    contextMenu: ContextMenu;
    item: MenuItem;
    root: boolean;
    constructor(domHandler: DomHandler, contextMenu: ContextMenu);
    activeItem: any;
    containerLeft: any;
    onItemMouseEnter(event: any, item: any, menuitem: any): void;
    onItemMouseLeave(event: any, link: any): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    position(sublist: any, item: any): void;
    calculateScrollbarWidth(): number;
}
export declare class ContextMenu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    global: boolean;
    target: any;
    style: any;
    styleClass: string;
    appendTo: any;
    containerViewChild: ElementRef;
    container: HTMLDivElement;
    visible: boolean;
    documentClickListener: any;
    rightClickListener: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    ngAfterViewInit(): void;
    show(event?: MouseEvent): void;
    hide(): void;
    toggle(event?: MouseEvent): void;
    position(event?: MouseEvent): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class ContextMenuModule {
}
