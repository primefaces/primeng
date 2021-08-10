import { ElementRef, EventEmitter, AfterViewInit, OnDestroy, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
export declare class ButtonDirective implements AfterViewInit, OnDestroy {
    el: ElementRef;
    iconPos: 'left' | 'right' | 'top' | 'bottom';
    loadingIcon: string;
    _label: string;
    _icon: string;
    _loading: boolean;
    initialized: boolean;
    _initialStyleClass: string;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    getStyleClass(): string;
    setStyleClass(): void;
    createIconEl(): void;
    getIconClass(): string;
    setIconClass(): void;
    removeIconElement(): void;
    get label(): string;
    set label(val: string);
    get icon(): string;
    set icon(val: string);
    get loading(): boolean;
    set loading(val: boolean);
    ngOnDestroy(): void;
}
export declare class Button implements AfterContentInit {
    type: string;
    iconPos: string;
    icon: string;
    badge: string;
    label: string;
    disabled: boolean;
    loading: boolean;
    loadingIcon: string;
    style: any;
    styleClass: string;
    badgeClass: string;
    contentTemplate: TemplateRef<any>;
    templates: QueryList<any>;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    ngAfterContentInit(): void;
    badgeStyleClass(): {
        'p-badge p-component': boolean;
        'p-badge-no-gutter': boolean;
    };
}
export declare class ButtonModule {
}
