import { QueryList, AfterContentInit, AfterViewInit, AfterViewChecked, TemplateRef, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
export declare class TabMenu implements AfterContentInit, AfterViewInit, AfterViewChecked {
    model: MenuItem[];
    activeItem: MenuItem;
    popup: boolean;
    style: any;
    styleClass: string;
    navbar: ElementRef;
    inkbar: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    tabChanged: boolean;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    itemClick(event: Event, item: MenuItem): void;
    updateInkBar(): void;
}
export declare class TabMenuModule {
}
