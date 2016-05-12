import {EventEmitter} from '@angular/core';

export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
}