import { AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TerminalService } from './terminalservice';
import { Subscription } from 'rxjs';
export declare class Terminal implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    terminalService: TerminalService;
    cd: ChangeDetectorRef;
    welcomeMessage: string;
    prompt: string;
    style: any;
    styleClass: string;
    commands: any[];
    command: string;
    container: Element;
    commandProcessed: boolean;
    subscription: Subscription;
    constructor(el: ElementRef, terminalService: TerminalService, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    set response(value: string);
    handleCommand(event: KeyboardEvent): void;
    focus(element: HTMLElement): void;
    ngOnDestroy(): void;
}
export declare class TerminalModule {
}
