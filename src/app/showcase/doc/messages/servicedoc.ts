import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'service-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                MessageService alternative does not require a value binding to an array. In order to use this service, import the class and define it as a provider in a component higher up in the component tree such as application instance itself so
                that descandant components can have it injected. If there are multiple message components having the same message service, you may use key property of the component to match the key of the message to implement scoping.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center gap-2">
                <button type="button" pButton class="p-button-primary" (click)="addSingle()" label="Show Single"></button>
                <button type="button" pButton class="p-button-success" (click)="addMultiple()" label="Show Multiple"></button>
                <button type="button" pButton class="p-button-warning" (click)="remove('id', 1)" label="Remove Single"></button>
                <button type="button" pButton class="p-button-secondary" (click)="clear()" label="Clear All"></button>
            </div>
            <p-messages></p-messages>
        </div>
        <app-code [code]="code" selector="messages-service-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class ServiceDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    addSingle() {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    }

    addMultiple() {
        this.messageService.addAll([
            { id: 1, severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
            { id: 2, severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }
        ]);
    }

    remove(key: string, value: any) {
        this.messageService.remove(key, value);
    }

    clear() {
        this.messageService.clear();
    }

    code: Code = {
        basic: `
<div class="flex justify-content-center gap-2">
    <button type="button" pButton class="p-button-primary" (click)="addSingle()" label="Single"></button>
    <button type="button" pButton class="p-button-success" (click)="addMultiple()" label="Multiple"></button>
    <button type="button" pButton class="p-button-warning" (click)="remove('id', 1)" label="Remove"></button>
    <button type="button" pButton class="p-button-secondary" (click)="clear()" label="Clear"></button>
</div>
<p-messages></p-messages>`,
        html: `
<div class="card">
    <div class="flex justify-content-center gap-2">
        <button type="button" pButton class="p-button-primary" (click)="addSingle()" label="Single"></button>
        <button type="button" pButton class="p-button-success" (click)="addMultiple()" label="Multiple"></button>
        <button type="button" pButton class="p-button-warning" (click)="remove('id', 1)" label="Remove"></button>
        <button type="button" pButton class="p-button-secondary" (click)="clear()" label="Clear"></button>
    </div>
    <p-messages></p-messages>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'messages-service-demo',
    templateUrl: './messages-service-demo.html',
    providers: [MessageService]
})
export class MessagesServiceDemo {
    constructor(private messageService: MessageService) {}

    addSingle() {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }

    addMultiple() {
        this.messageService.addAll([
            { id: 1, severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
            { id: 2, severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }
        ]);
    }

    remove(key: string, value: any) {
        this.messageService.remove(key, value);
    }
    
    clear() {
        this.messageService.clear();
    }
}`
    };
}
