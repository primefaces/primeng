import { OnInit, AfterViewInit, OnDestroy, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class OverlayPanel implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    private cd;
    dismissable: boolean;
    showCloseIcon: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    onBeforeShow: EventEmitter<any>;
    onAfterShow: EventEmitter<any>;
    onBeforeHide: EventEmitter<any>;
    onAfterHide: EventEmitter<any>;
    container: any;
    visible: boolean;
    documentClickListener: any;
    selfClick: boolean;
    targetEvent: boolean;
    target: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    toggle(event: any, target?: any): void;
    show(event: any, target?: any): void;
    hide(): void;
    onPanelClick(): void;
    onCloseClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class OverlayPanelModule {
}
