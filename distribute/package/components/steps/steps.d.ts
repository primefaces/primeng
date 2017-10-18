import { EventEmitter } from '@angular/core';
import { MenuItem } from '../common/menuitem';
export declare class Steps {
    activeIndex: number;
    model: MenuItem[];
    readonly: boolean;
    style: any;
    styleClass: string;
    activeIndexChange: EventEmitter<any>;
    itemClick(event: Event, item: MenuItem, i: number): void;
}
export declare class StepsModule {
}
