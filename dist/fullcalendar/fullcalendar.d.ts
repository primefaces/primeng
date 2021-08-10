import { ElementRef, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
export declare class FullCalendar implements OnDestroy, OnInit, AfterViewChecked {
    el: ElementRef;
    style: any;
    styleClass: string;
    initialized: boolean;
    calendar: any;
    config: any;
    _options: any;
    _events: any[];
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    get events(): any;
    set events(value: any);
    get options(): any;
    set options(value: any);
    initialize(): void;
    getCalendar(): any;
    ngOnDestroy(): void;
}
export declare class FullCalendarModule {
}
