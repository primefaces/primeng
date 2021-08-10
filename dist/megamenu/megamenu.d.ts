import { ElementRef, Renderer2, ChangeDetectorRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
export declare class MegaMenu implements AfterContentInit {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    model: MegaMenuItem[];
    style: any;
    styleClass: string;
    orientation: string;
    autoZIndex: boolean;
    baseZIndex: number;
    templates: QueryList<any>;
    activeItem: any;
    documentClickListener: any;
    startTemplate: TemplateRef<any>;
    endTemplate: TemplateRef<any>;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onCategoryMouseEnter(event: any, menuitem: MegaMenuItem): void;
    onCategoryClick(event: any, item: MenuItem | MegaMenuItem): void;
    itemClick(event: any, item: MenuItem | MegaMenuItem): void;
    getColumnClass(menuitem: MegaMenuItem): any;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
}
export declare class MegaMenuModule {
}
