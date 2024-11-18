import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Message component requires a content to display.</p>
        </app-docsectiontext>
        <div class="card">
            <p-message>Message Content</p-message>
        </div>
        <app-code [code]="code" selector="message-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-message>Message Content</p-message>`,

        html: `<div class="card">
    <p-message>Message Content</p-message>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-basic-demo',
    templateUrl: './message-basic-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageBasicDemo {}`
    };
}
