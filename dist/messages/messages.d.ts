import { OnDestroy, EventEmitter, AfterContentInit, ElementRef, QueryList, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
export declare class Messages implements AfterContentInit, OnDestroy {
    messageService: MessageService;
    el: ElementRef;
    cd: ChangeDetectorRef;
    value: Message[];
    closable: boolean;
    style: any;
    styleClass: string;
    enableService: boolean;
    key: string;
    escape: boolean;
    severity: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    templates: QueryList<any>;
    valueChange: EventEmitter<Message[]>;
    messageSubscription: Subscription;
    clearSubscription: Subscription;
    contentTemplate: TemplateRef<any>;
    constructor(messageService: MessageService, el: ElementRef, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    hasMessages(): boolean;
    clear(): void;
    removeMessage(i: number): void;
    get icon(): string;
    ngOnDestroy(): void;
}
export declare class MessagesModule {
}
