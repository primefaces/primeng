import { ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class TieredMenuSub {
    domHandler: DomHandler;
    item: MenuItem;
    root: boolean;
    constructor(domHandler: DomHandler);
    activeItem: HTMLLIElement;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    onItemMouseLeave(event: Event): void;
    itemClick(event: Event, item: MenuItem): boolean;
    listClick(event: Event): void;
}
export declare class TieredMenu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    container: any;
    documentClickListener: any;
    preventDocumentDefault: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    ngAfterViewInit(): void;
    toggle(event: Event): void;
    show(event: Event): void;
    hide(): void;
    unbindDocumentClickListener(): void;
    bindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class TieredMenuModule {
}
