import { AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
export declare class Ripple implements AfterViewInit, OnDestroy {
    el: ElementRef;
    zone: NgZone;
    config: PrimeNGConfig;
    constructor(el: ElementRef, zone: NgZone, config: PrimeNGConfig);
    animationListener: any;
    mouseDownListener: any;
    ngAfterViewInit(): void;
    onMouseDown(event: MouseEvent): void;
    getInk(): any;
    resetInk(): void;
    onAnimationEnd(event: any): void;
    create(): void;
    remove(): void;
    ngOnDestroy(): void;
}
export declare class RippleModule {
}
