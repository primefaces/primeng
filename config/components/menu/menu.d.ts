import { ElementRef, AfterViewInit, OnDestroy, Renderer } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/api';
import { Router } from '@angular/router';
export declare class Menu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer;
    router: Router;
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
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer, router: Router);
    ngAfterViewInit(): void;
    toggle(event: any): void;
    onResize(event: any): void;
    show(event: any): void;
    hide(): void;
    itemClick(event: any, item: MenuItem): void;
    ngOnDestroy(): void;
    hasSubMenu(): boolean;
    unsubscribe(item: any): void;
}
export declare class MenuModule {
}
