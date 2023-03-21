import { Component, Input } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'messages-dynamic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A binding to the value property is required to provide messages to the component.</p>
        </app-docsectiontext>
        <div class="card">
            <button type="button" pButton pRipple (click)="addMessages()" label="Show" class="mr-2"></button>
            <button type="button" pButton pRipple (click)="clearMessages()" icon="pi pi-times" label="Clear" class="p-button-secondary"></button>
            <p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>
        </div>
        <app-code [code]="code" selector="messages-dynamic-demo"></app-code>
    </section>`
})
export class DynamicDoc {
    @Input() id: string;

    @Input() title: string;

    messages: Message[];

    addMessages() {
        this.messages = [
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'info', summary: 'Info', detail: 'Message Content' },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
            { severity: 'error', summary: 'Error', detail: 'Message Content' }
        ];
    }

    clearMessages() {
        this.messages = [];
    }

    code: Code = {
        basic: `
<button type="button" pButton pRipple (click)="addMessages()" label="Show" class="mr-2"></button>
<button type="button" pButton pRipple (click)="clearMessages()" icon="pi pi-times" label="Clear" class="p-button-secondary"></button>
<p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>`,
        html: `
<div class="card">
    <button type="button" pButton pRipple (click)="addMessages()" label="Show" class="mr-2"></button>
    <button type="button" pButton pRipple (click)="clearMessages()" icon="pi pi-times" label="Clear" class="p-button-secondary"></button>
    <p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
    selector: 'messages-dynamic-demo',
    templateUrl: './messages-dynamic-demo.html'
})
export class MessagesDynamicDemo {
    messages: Message[];

    addMessages() {
        this.messages = [
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'info', summary: 'Info', detail: 'Message Content' },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
            { severity: 'error', summary: 'Error', detail: 'Message Content' }
        ];
    }

    clearMessages() {
        this.messages = [];
    }
}`
    };
}
