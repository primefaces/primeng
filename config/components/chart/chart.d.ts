import { ElementRef, AfterViewInit, OnDestroy, EventEmitter, IterableDiffers } from '@angular/core';
export declare class UIChart implements AfterViewInit, OnDestroy {
    el: ElementRef;
    type: string;
    data: any;
    options: any;
    width: string;
    height: string;
    onDataSelect: EventEmitter<any>;
    initialized: boolean;
    chart: any;
    differ: any;
    constructor(el: ElementRef, differs: IterableDiffers);
    ngAfterViewInit(): void;
    onCanvasClick(event: any): void;
    initChart(): void;
    getCanvas(): any;
    getBase64Image(): any;
    refresh(): void;
    ngOnDestroy(): void;
}
export declare class ChartModule {
}
