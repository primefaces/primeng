import {EventEmitter} from '@angular/core';

export interface MenuElement {}

export interface MenuItem extends MenuElement {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    eventEmitter?: EventEmitter<any>;
}

export interface SubMenu extends MenuElement {
    label?: string;
    icon?: string;
    items: MenuElement[];
}