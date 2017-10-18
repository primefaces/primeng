import { AfterViewInit, AfterViewChecked, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Sidebar implements AfterViewInit, AfterViewChecked {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    position: string;
    fullScreen: boolean;
    appendTo: string;
    blockScroll: boolean;
    style: any;
    styleClass: string;
    baseZIndex: number;
    containerViewChild: ElementRef;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    visibleChange: EventEmitter<any>;
    initialized: boolean;
    _visible: boolean;
    preventVisibleChangePropagation: boolean;
    mask: HTMLDivElement;
    maskClickListener: Function;
    executePostDisplayActions: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    ngAfterViewInit(): void;
    visible: boolean;
    ngAfterViewChecked(): void;
    show(): void;
    hide(): void;
    close(event: Event): void;
    enableModality(): void;
    disableModality(): void;
    unbindMaskClickListener(): void;
    ngOnDestroy(): void;
}
export declare class SidebarModule {
}
