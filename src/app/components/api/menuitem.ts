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
    tooltip?: string;
    tooltipPosition?: string;
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
    tooltipOptions?: {
        tooltipLabel?: string;
        tooltipPosition?: string;
        tooltipEvent?: string;
        appendTo?: any;
        positionStyle?: string;
        tooltipStyleClass?: string;
        tooltipZIndex?: string;
        escape?: boolean;
        disabled?: boolean;
        positionTop?: number;
        positionLeft?: number;
        showDelay?: number;
        hideDelay?: number;
        life?: number;
    }
}
