import { EventEmitter, ChangeDetectorRef, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
export declare class InplaceDisplay {
}
export declare class InplaceContent {
}
export declare class Inplace implements AfterContentInit {
    cd: ChangeDetectorRef;
    active: boolean;
    closable: boolean;
    disabled: boolean;
    preventClick: boolean;
    style: any;
    styleClass: string;
    closeIcon: string;
    templates: QueryList<any>;
    onActivate: EventEmitter<any>;
    onDeactivate: EventEmitter<any>;
    hover: boolean;
    displayTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    constructor(cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onActivateClick(event: any): void;
    onDeactivateClick(event: any): void;
    activate(event?: Event): void;
    deactivate(event?: Event): void;
    onKeydown(event: KeyboardEvent): void;
}
export declare class InplaceModule {
}
