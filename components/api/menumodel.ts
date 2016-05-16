import {EventEmitter} from '@angular/core';

export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: any;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
}