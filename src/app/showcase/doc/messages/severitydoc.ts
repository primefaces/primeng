import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'severity-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>severity</i> option specifies the type of the message.</p>
        </app-docsectiontext>
        <div class="card">
            <p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>
        </div>
        <app-code [code]="code" selector="messages-severity-demo"></app-code>
    </section>`
})
export class SeverityDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    messages: Message[];

    ngOnInit() {
        this.messages = [
            { severity: 'info', summary: 'Info', detail: 'Message Content' },
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
            { severity: 'error', summary: 'Error', detail: 'Message Content' }
        ];
    }

    code: Code = {
        basic: `
<p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>`,
        html: `
<div class="card">
    <p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
    selector: 'messages-severity-demo',
    templateUrl: './messages-severity-demo.html'
})
export class MessagesSeverityDemo implements OnInit {
    messages: Message[];

    ngOnInit() {
        this.messages = [
            { severity: 'info', summary: 'Info', detail: 'Message Content' },
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
            { severity: 'error', summary: 'Error', detail: 'Message Content' },
        ];
    }
}`
    };
}
