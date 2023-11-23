import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                A single message is specified by <i>Message</i> interface in PrimeNG that defines the <i>id</i>, <i>severity</i>, <i>summary</i> and <i>detail</i> as the properties. Messages to display can either be defined using the value property
                which should an array of Message instances or using a <i>MessageService</i> are defined using the <i>value</i> property which should an array of Message instances.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>
        </div>
        <app-code [code]="code" selector="messages-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {

    messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
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
    selector: 'messages-basic-demo',
    templateUrl: './messages-basic-demo.html'
})
export class MessagesBasicDemo implements OnInit {
    messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
    }
}`
    };
}
