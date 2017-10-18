import { ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class UIChart implements AfterViewInit, OnDestroy {
    el: ElementRef;
    type: string;
    options: any;
    width: string;
    height: string;
    onDataSelect: EventEmitter<any>;
    initialized: boolean;
    _data: any;
    chart: any;
    constructor(el: ElementRef);
    data: any;
    ngAfterViewInit(): void;
    onCanvasClick(event: any): void;
    initChart(): void;
    getCanvas(): any;
    getBase64Image(): any;
    generateLegend(): void;
    refresh(): void;
    reinit(): void;
    ngOnDestroy(): void;
}
export declare class ChartModule {
}
