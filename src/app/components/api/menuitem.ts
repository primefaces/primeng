import { QueryParamsHandling } from '@angular/router';

export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    items?: MenuItem[];
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    target?: string;
    escape?: boolean;
    routerLinkActiveOptions?: any;
    separator?: boolean;
    badge?: string;
    badgeStyleClass?: string;
    style?:any;
    styleClass?:string;
    title?: string;
    id?: string;
    automationId?: any;
    tabindex?: string;
    routerLink?: any;
    queryParams?: { [k: string]: any };
    fragment?: string;
    queryParamsHandling?: QueryParamsHandling;
    preserveFragment?: boolean;
    skipLocationChange?: boolean;
    replaceUrl?: boolean;
    state?: {
        [k: string]: any;
    }
}
