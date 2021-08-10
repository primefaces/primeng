import { AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef, QueryList, TemplateRef } from '@angular/core';
export declare class BlockUI implements AfterViewInit, OnDestroy {
    el: ElementRef;
    cd: ChangeDetectorRef;
    target: any;
    autoZIndex: boolean;
    baseZIndex: number;
    styleClass: string;
    templates: QueryList<any>;
    mask: ElementRef;
    _blocked: boolean;
    contentTemplate: TemplateRef<any>;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    get blocked(): boolean;
    set blocked(val: boolean);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    block(): void;
    unblock(): void;
    ngOnDestroy(): void;
}
export declare class BlockUIModule {
}
