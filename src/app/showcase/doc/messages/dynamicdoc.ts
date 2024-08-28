import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'messages-dynamic-demo',
    template: `
        <app-docsectiontext>
            <p>A binding to the value property is required to provide messages to the component.</p>
        </app-docsectiontext>
        <div class="card">
            <p-button type="button" pRipple (onClick)="addMessages()" label="Show" styleClass="mr-2" />
            <p-button type="button" pRipple (onClick)="clearMessages()" label="Clear" severity="secondary" />
            <p-messages [(value)]="messages" [enableService]="false" />
        </div>
        <app-code [code]="code" selector="messages-dynamic-demo"></app-code>
    `
})
export class DynamicDoc {
    messages: Message[] | undefined;

    addMessages() {
        this.messages = [
            { severity: 'info', summary: 'Dynamic Info Message' },
            { severity: 'success', summary: 'Dynamic Success Message' },
            { severity: 'warn', summary: 'Dynamic Warning Message' }
        ];
    }

    clearMessages() {
        this.messages = [];
    }

    code: Code = {
        basic: `<p-button 
    type="button" 
    pRipple 
    (onClick)="addMessages()" 
    label="Show" 
    styleClass="mr-2" />
<p-button 
    type="button" 
    pRipple 
    (onClick)="clearMessages()" 
    label="Clear" 
    severity="secondary" />
<p-messages [(value)]="messages" [enableService]="false" />`,
        html: `<div class="card">
    <p-button 
        type="button" 
        pRipple 
        (onClick)="addMessages()" 
        label="Show" 
        styleClass="mr-2" />
    <p-button 
        type="button"
        pRipple 
        (onClick)="clearMessages()" 
        label="Clear" 
        severity="secondary" />
    <p-messages [(value)]="messages" [enableService]="false" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'messages-dynamic-demo',
    templateUrl: './messages-dynamic-demo.html',
    standalone: true,
    imports: [MessagesModule, ButtonModule, RippleModule]
})
export class MessagesDynamicDemo {
    messages: Message[] | undefined;

    addMessages() {
        this.messages = [
            { severity: 'info', summary: 'Dynamic Info Message' },
            { severity: 'success', summary: 'Dynamic Success Message' },
            { severity: 'warn', summary: 'Dynamic Warning Message' }
        ];
    }

    clearMessages() {
        this.messages = [];
    }
}`
    };
}
