import { ElementRef, AfterViewChecked, DoCheck, EventEmitter, IterableDiffers, ChangeDetectorRef, NgZone } from '@angular/core';
export declare class GMap implements AfterViewChecked, DoCheck {
    el: ElementRef;
    cd: ChangeDetectorRef;
    zone: NgZone;
    style: any;
    styleClass: string;
    options: any;
    overlays: any[];
    onMapClick: EventEmitter<any>;
    onOverlayClick: EventEmitter<any>;
    onOverlayDragStart: EventEmitter<any>;
    onOverlayDrag: EventEmitter<any>;
    onOverlayDragEnd: EventEmitter<any>;
    onMapReady: EventEmitter<any>;
    onMapDragEnd: EventEmitter<any>;
    onZoomChanged: EventEmitter<any>;
    differ: any;
    map: any;
    constructor(el: ElementRef, differs: IterableDiffers, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewChecked(): void;
    initialize(): void;
    bindOverlayEvents(overlay: any): void;
    ngDoCheck(): void;
    bindDragEvents(overlay: any): void;
    getMap(): any;
}
export declare class GMapModule {
}
