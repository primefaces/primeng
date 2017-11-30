import { ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { Router } from '@angular/router';
export declare class SplitButton implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    router: Router;
    cd: ChangeDetectorRef;
    model: MenuItem[];
    icon: string;
    iconPos: string;
    label: string;
    onClick: EventEmitter<any>;
    onDropdownClick: EventEmitter<any>;
    style: any;
    styleClass: string;
    menuStyle: any;
    menuStyleClass: string;
    disabled: boolean;
    tabindex: number;
    appendTo: any;
    buttonViewChild: ElementRef;
    overlayViewChild: ElementRef;
    menuVisible: boolean;
    documentClickListener: any;
    dropdownClick: boolean;
    shown: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, router: Router, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    onDefaultButtonClick(event: Event): void;
    itemClick(event: Event, item: MenuItem): void;
    show(): void;
    onShow(): void;
    onDropdownButtonClick(event: Event): void;
    alignPanel(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class SplitButtonModule {
}
