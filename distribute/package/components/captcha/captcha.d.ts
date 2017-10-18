import { AfterViewInit, EventEmitter, NgZone, ElementRef } from '@angular/core';
export declare class Captcha implements AfterViewInit {
    el: ElementRef;
    _zone: NgZone;
    siteKey: string;
    theme: string;
    type: string;
    size: string;
    tabindex: number;
    language: string;
    initCallback: string;
    onResponse: EventEmitter<any>;
    onExpire: EventEmitter<any>;
    private _instance;
    constructor(el: ElementRef, _zone: NgZone);
    ngAfterViewInit(): void;
    init(): void;
    reset(): void;
    getResponse(): String;
    recaptchaCallback(response: string): void;
    recaptchaExpiredCallback(): void;
    ngOnDestroy(): void;
}
export declare class CaptchaModule {
}
