import { MenuItem } from '../common/menuitem';
export declare class TabMenu {
    model: MenuItem[];
    activeItem: MenuItem;
    popup: boolean;
    style: any;
    styleClass: string;
    itemClick(event: Event, item: MenuItem): void;
}
export declare class TabMenuModule {
}
