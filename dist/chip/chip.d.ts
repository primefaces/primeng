import { EventEmitter } from '@angular/core';
export declare class Chip {
    label: string;
    icon: string;
    image: string;
    style: any;
    styleClass: string;
    removable: boolean;
    removeIcon: string;
    onRemove: EventEmitter<any>;
    visible: boolean;
    containerClass(): {
        'p-chip p-component': boolean;
        'p-chip-image': boolean;
    };
    close(event: any): void;
}
export declare class ChipModule {
}
