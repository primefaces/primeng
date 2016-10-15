import {EventEmitter,Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export interface SortMeta {
    field: string;
    order: number;
}

export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {[s: string]: FilterMetadata;};
}

export interface FilterMetadata {
    value?: string;
    matchMode?: string;
}

export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    routerLink?: any;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
    expanded?: boolean;
    disabled?: boolean;
}

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
}

export interface SelectItem {
    label: string;
    value: any;
}

export interface TreeNode {
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
}

export interface Confirmation {
    message: string;
    icon?: string;
    header?: string;
    accept?: Function;
    reject?: Function;
    acceptVisible?: boolean;
    rejectVisible?: boolean;
    acceptEvent?: EventEmitter<any>;
    rejectEvent?: EventEmitter<any>;
}

export interface BlockableUI {
    getBlockableElement(): HTMLElement;
}

@Injectable()
export class ConfirmationService {
    
    private requireConfirmationSource = new Subject<Confirmation>();
    private acceptConfirmationSource = new Subject<Confirmation>();
    
    requireConfirmation$ = this.requireConfirmationSource.asObservable();
    accept = this.acceptConfirmationSource.asObservable();
    
    confirm(confirmation: Confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    
    onAccept() {
        this.acceptConfirmationSource.next();
    }
}