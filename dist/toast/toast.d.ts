import { OnInit, AfterViewInit, AfterContentInit, OnDestroy, ElementRef, EventEmitter, QueryList, TemplateRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
export declare class ToastItem implements AfterViewInit, OnDestroy {
    private zone;
    message: Message;
    index: number;
    template: TemplateRef<any>;
    showTransformOptions: string;
    hideTransformOptions: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    timeout: any;
    constructor(zone: NgZone);
    ngAfterViewInit(): void;
    initTimeout(): void;
    clearTimeout(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onCloseIconClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class Toast implements OnInit, AfterContentInit, OnDestroy {
    messageService: MessageService;
    private cd;
    key: string;
    autoZIndex: boolean;
    baseZIndex: number;
    style: any;
    styleClass: string;
    position: string;
    preventOpenDuplicates: boolean;
    preventDuplicates: boolean;
    showTransformOptions: string;
    hideTransformOptions: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    templates: QueryList<any>;
    messageSubscription: Subscription;
    clearSubscription: Subscription;
    messages: Message[];
    messagesArchieve: Message[];
    template: TemplateRef<any>;
    constructor(messageService: MessageService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    add(messages: Message[]): void;
    canAdd(message: Message): boolean;
    containsMessage(collection: Message[], message: Message): boolean;
    ngAfterContentInit(): void;
    onMessageClose(event: any): void;
    onAnimationStart(event: AnimationEvent): void;
    ngOnDestroy(): void;
}
export declare class ToastModule {
}
