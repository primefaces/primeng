import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'closable-doc',
    template: `
        <app-docsectiontext>
            <p>Enable <i>closable</i> option to display an icon to remove a message.</p>
        </app-docsectiontext>
        <div class="card">
            <p-message closable>Closable Message</p-message>
        </div>
        <app-code [code]="code" selector="message-closable-demo"></app-code>
    `
})
export class ClosableDoc {
    code: Code = {
        basic: `<p-message closable>Closable Message</p-message>`,

        html: `<div class="card">
    <p-message closable>Closable Message</p-message>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-closable-demo',
    templateUrl: './message-closable-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageClosableDemo {}`
    };
}
