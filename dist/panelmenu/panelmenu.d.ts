import { ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
export declare class BasePanelMenuItem {
    private ref;
    constructor(ref: ChangeDetectorRef);
    handleClick(event: any, item: any): void;
}
export declare class PanelMenuSub extends BasePanelMenuItem {
    item: MenuItem;
    expanded: boolean;
    transitionOptions: string;
    root: boolean;
    constructor(ref: ChangeDetectorRef);
}
export declare class PanelMenu extends BasePanelMenuItem {
    model: MenuItem[];
    style: any;
    styleClass: string;
    multiple: boolean;
    transitionOptions: string;
    animating: boolean;
    constructor(ref: ChangeDetectorRef);
    collapseAll(): void;
    handleClick(event: any, item: any): void;
    onToggleDone(): void;
}
export declare class PanelMenuModule {
}
