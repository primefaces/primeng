import { OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class ScrollTop implements OnInit, OnDestroy {
    el: ElementRef;
    private cd;
    styleClass: string;
    style: any;
    target: string;
    threshold: number;
    icon: string;
    behavior: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    scrollListener: any;
    visible: boolean;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    onEnter(): void;
    checkVisibility(scrollY: any): void;
    bindParentScrollListener(): void;
    bindDocumentScrollListener(): void;
    unbindParentScrollListener(): void;
    unbindDocumentScrollListener(): void;
    containerClass(): {
        'p-scrolltop p-link p-component': boolean;
        'p-scrolltop-sticky': boolean;
    };
    ngOnDestroy(): void;
}
export declare class ScrollTopModule {
}
