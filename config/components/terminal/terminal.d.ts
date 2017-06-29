import { AfterViewInit, AfterViewChecked, EventEmitter, ElementRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Terminal implements AfterViewInit, AfterViewChecked {
    el: ElementRef;
    domHandler: DomHandler;
    welcomeMessage: string;
    prompt: string;
    style: any;
    styleClass: string;
    responseChange: EventEmitter<any>;
    handler: EventEmitter<any>;
    commands: any[];
    command: string;
    container: Element;
    commandProcessed: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    response: string;
    handleCommand(event: KeyboardEvent): void;
    focus(element: HTMLElement): void;
}
export declare class TerminalModule {
}
