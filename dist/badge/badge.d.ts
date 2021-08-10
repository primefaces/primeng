import { OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
export declare class BadgeDirective implements AfterViewInit, OnDestroy {
    el: ElementRef;
    iconPos: 'left' | 'right' | 'top' | 'bottom';
    _value: string;
    initialized: boolean;
    private id;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    get value(): string;
    set value(val: string);
    severity: string;
    ngOnDestroy(): void;
}
export declare class Badge {
    styleClass: string;
    style: any;
    size: string;
    severity: string;
    value: string;
    containerClass(): {
        'p-badge p-component': boolean;
        'p-badge-no-gutter': boolean;
        'p-badge-lg': boolean;
        'p-badge-xl': boolean;
        'p-badge-info': boolean;
        'p-badge-success': boolean;
        'p-badge-warning': boolean;
        'p-badge-danger': boolean;
    };
}
export declare class BadgeModule {
}
