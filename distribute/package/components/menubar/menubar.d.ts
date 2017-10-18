import { ElementRef, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class MenubarSub {
    domHandler: DomHandler;
    item: MenuItem;
    root: boolean;
    constructor(domHandler: DomHandler);
    activeItem: any;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    onItemMouseLeave(event: Event): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
}
export declare class Menubar {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    style: any;
    styleClass: string;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
}
export declare class MenubarModule {
}
