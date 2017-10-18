import { ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class MenuItemContent {
    menu: Menu;
    item: MenuItem;
    constructor(menu: Menu);
}
export declare class Menu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    containerViewChild: ElementRef;
    container: HTMLDivElement;
    documentClickListener: any;
    preventDocumentDefault: any;
    onResizeTarget: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    ngAfterViewInit(): void;
    toggle(event: any): void;
    onResize(event: any): void;
    show(event: any): void;
    hide(): void;
    itemClick(event: any, item: MenuItem): void;
    ngOnDestroy(): void;
    hasSubMenu(): boolean;
}
export declare class MenuModule {
}
