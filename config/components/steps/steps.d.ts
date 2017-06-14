import { EventEmitter } from '@angular/core';
import { MenuItem } from '../common/api';
import { Router } from '@angular/router';
export declare class Steps {
    router: Router;
    activeIndex: number;
    model: MenuItem[];
    readonly: boolean;
    style: any;
    styleClass: string;
    activeIndexChange: EventEmitter<any>;
    constructor(router: Router);
    itemClick(event: Event, item: MenuItem, i: number): void;
}
export declare class StepsModule {
}
