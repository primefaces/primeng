import { MenuItem } from '../common/menuitem';
export declare class Breadcrumb {
    model: MenuItem[];
    style: any;
    styleClass: string;
    home: MenuItem;
    itemClick(event: any, item: MenuItem): void;
    onHomeClick(event: any): void;
}
export declare class BreadcrumbModule {
}
