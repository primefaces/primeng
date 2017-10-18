import { EventEmitter, ElementRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class Fieldset implements BlockableUI {
    private el;
    legend: string;
    toggleable: boolean;
    collapsed: boolean;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    style: any;
    styleClass: string;
    animating: boolean;
    constructor(el: ElementRef);
    toggle(event: any): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
}
export declare class FieldsetModule {
}
