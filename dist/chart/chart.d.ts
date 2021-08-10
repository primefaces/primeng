import { ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class UIChart implements AfterViewInit, OnDestroy {
    el: ElementRef;
    type: string;
    plugins: any[];
    width: string;
    height: string;
    responsive: boolean;
    onDataSelect: EventEmitter<any>;
    initialized: boolean;
    _data: any;
    _options: any;
    chart: any;
    constructor(el: ElementRef);
    get data(): any;
    set data(val: any);
    get options(): any;
    set options(val: any);
    ngAfterViewInit(): void;
    onCanvasClick(event: any): void;
    initChart(): void;
    getCanvas(): any;
    getBase64Image(): any;
    generateLegend(): any;
    refresh(): void;
    reinit(): void;
    ngOnDestroy(): void;
}
export declare class ChartModule {
}
