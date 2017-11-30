import { ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class DeferredLoader implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    viewContainer: ViewContainerRef;
    onLoad: EventEmitter<any>;
    template: TemplateRef<any>;
    documentScrollListener: Function;
    view: EmbeddedViewRef<any>;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, viewContainer: ViewContainerRef);
    ngAfterViewInit(): void;
    shouldLoad(): boolean;
    load(): void;
    ngOnDestroy(): void;
}
export declare class DeferModule {
}
