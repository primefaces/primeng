import { ElementRef, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
export declare class SplitButton {
    model: MenuItem[];
    icon: string;
    iconPos: string;
    label: string;
    onClick: EventEmitter<any>;
    onDropdownClick: EventEmitter<any>;
    style: any;
    styleClass: string;
    menuStyle: any;
    menuStyleClass: string;
    disabled: boolean;
    tabindex: number;
    appendTo: any;
    dir: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    containerViewChild: ElementRef;
    buttonViewChild: ElementRef;
    menu: Menu;
    onDefaultButtonClick(event: Event): void;
    onDropdownButtonClick(event: Event): void;
}
export declare class SplitButtonModule {
}
