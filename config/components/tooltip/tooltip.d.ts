import { ElementRef, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Tooltip implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    text: string;
    tooltipPosition: string;
    tooltipEvent: string;
    appendTo: any;
    positionStyle: string;
    tooltipStyleClass: string;
    disabled: boolean;
    container: any;
    constructor(el: ElementRef, domHandler: DomHandler);
    onMouseEnter(e: Event): void;
    onMouseLeave(e: Event): void;
    onFocus(e: Event): void;
    onBlur(e: Event): void;
    show(): void;
    hide(): void;
    create(): void;
    ngOnDestroy(): void;
}
export declare class TooltipModule {
}
