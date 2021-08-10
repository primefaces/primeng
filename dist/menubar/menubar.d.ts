import { ElementRef, Renderer2, OnDestroy, ChangeDetectorRef, AfterContentInit, QueryList, TemplateRef, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
export declare class MenubarSub implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    item: MenuItem;
    root: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    mobileActive: boolean;
    autoDisplay: boolean;
    get parentActive(): boolean;
    set parentActive(value: boolean);
    leafClick: EventEmitter<any>;
    _parentActive: boolean;
    documentClickListener: any;
    menuHoverActive: boolean;
    activeItem: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    onItemClick(event: any, item: any): void;
    onItemMouseEnter(event: any, item: any): void;
    onLeafClick(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class Menubar implements AfterContentInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    model: MenuItem[];
    style: any;
    styleClass: string;
    autoZIndex: boolean;
    baseZIndex: number;
    autoDisplay: boolean;
    templates: QueryList<any>;
    menubutton: ElementRef;
    rootmenu: MenubarSub;
    startTemplate: TemplateRef<any>;
    endTemplate: TemplateRef<any>;
    mobileActive: boolean;
    outsideClickListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    toggle(event: any): void;
    bindOutsideClickListener(): void;
    onLeafClick(): void;
    unbindOutsideClickListener(): void;
    ngOnDestroy(): void;
}
export declare class MenubarModule {
}
