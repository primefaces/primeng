import { OnDestroy } from '@angular/core';
import { MenuItem } from '../common/api';
import { Router } from '@angular/router';
export declare class TabMenu implements OnDestroy {
    router: Router;
    model: MenuItem[];
    activeItem: MenuItem;
    popup: boolean;
    style: any;
    styleClass: string;
    constructor(router: Router);
    ngOnInit(): void;
    itemClick(event: Event, item: MenuItem): void;
    ngOnDestroy(): void;
    unsubscribe(item: any): void;
}
export declare class TabMenuModule {
}
