import { MenuItem } from '../common/api';
import { Router } from '@angular/router';
export declare class BasePanelMenuItem {
    router: Router;
    constructor(router: Router);
    handleClick(event: any, item: any): void;
}
export declare class PanelMenuSub extends BasePanelMenuItem {
    item: MenuItem;
    expanded: boolean;
    constructor(router: Router);
}
export declare class PanelMenu extends BasePanelMenuItem {
    model: MenuItem[];
    style: any;
    styleClass: string;
    animating: boolean;
    constructor(router: Router);
    unsubscribe(item: any): void;
    ngOnDestroy(): void;
    handleClick(event: any, item: any): void;
}
export declare class PanelMenuModule {
}
