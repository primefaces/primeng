import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '@domain/code';

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
            <p-messages [(value)]="messages" [enableService]="false" [closable]="false" />
        </div>
        <app-code [code]="code" selector="messages-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [{ severity: 'info', detail: 'Message Content' }];
    }

    code: Code = {
        basic: `<p-messages 
    [(value)]="messages" 
    [enableService]="false" 
    [closable]="false" />`,
        html: `<div class="card">
    <p-messages 
        [(value)]="messages" 
        [enableService]="false" 
        [closable]="false" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
    selector: 'messages-basic-demo',
    templateUrl: './messages-basic-demo.html',
    standalone: true,
    imports: [MessagesModule]
})
export class MessagesBasicDemo implements OnInit {
    messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [{ severity: 'info', detail: 'Message Content' }];
    }
}`
    };
}
