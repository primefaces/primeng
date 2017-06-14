import { ElementRef, AfterViewInit, DoCheck, OnDestroy, IterableDiffers } from '@angular/core';
import { Message } from '../common/api';
import { DomHandler } from '../dom/domhandler';
export declare class Growl implements AfterViewInit, DoCheck, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    sticky: boolean;
    life: number;
    value: Message[];
    style: any;
    styleClass: string;
    containerViewChild: ElementRef;
    differ: any;
    zIndex: number;
    container: HTMLDivElement;
    stopDoCheckPropagation: boolean;
    timeout: any;
    constructor(el: ElementRef, domHandler: DomHandler, differs: IterableDiffers);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    remove(msg: Message, msgel: any): void;
    removeAll(): void;
    findMessageIndex(msg: Message): number;
    ngOnDestroy(): void;
}
export declare class GrowlModule {
}
