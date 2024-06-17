import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'closable-doc',
    template: `
        <app-docsectiontext>
            <p>
                Messages are <i>closable</i> by default resulting in a close icon being displayed on top right corner. In order to disable closable messages, set <i>closable</i> to <i>false</i>. Note that in this case two-way binding is not necessary
                as the component does not need to update its value.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-messages [(value)]="messages" [closable]="false" />
        </div>
        <app-code [code]="code" selector="messages-closable-demo"></app-code>
    `
})
export class ClosableDoc implements OnInit {
    messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [{ severity: 'info', detail: 'Not Closable' }];
    }

    code: Code = {
        basic: `<p-messages [(value)]="messages" [closable]="false" />`,
        html: `<div class="card">
    <p-messages [(value)]="messages" [closable]="false" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
    selector: 'messages-closable-demo',
    templateUrl: './messages-closable-demo.html',
    standalone: true,
    imports: [MessagesModule]
})
export class MessagesClosableDemo implements OnInit {
    messages1: Message[] | undefined;

    messages2: Message[] | undefined;

    ngOnInit() {
        this.messages1 = [
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'info', summary: 'Info', detail: 'Message Content' },
        ];

        this.messages2 = [
            { severity: 'warn', summary: 'Waning', detail: 'Closable Message Content' },
            { severity: 'error', summary: 'Error', detail: 'Closable Message Content' },
        ];
    }
}`
    };
}
