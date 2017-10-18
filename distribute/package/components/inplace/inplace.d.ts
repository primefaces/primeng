import { EventEmitter } from '@angular/core';
export declare class InplaceDisplay {
}
export declare class InplaceContent {
}
export declare class Inplace {
    active: boolean;
    closable: boolean;
    disabled: boolean;
    style: any;
    styleClass: string;
    onActivate: EventEmitter<any>;
    onDeactivate: EventEmitter<any>;
    hover: boolean;
    activate(event: any): void;
    deactivate(event: any): void;
}
export declare class InplaceModule {
}
