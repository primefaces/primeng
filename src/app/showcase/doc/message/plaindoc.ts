import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'plain-doc',
    template: `
        <app-docsectiontext>
            <p>Configure the <i>variant</i> value as <i>plain</i> for messages without borders and backgrounds.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-message severity="success" variant="plain">Success Message</p-message>
            <p-message severity="info" variant="plain">Info Message</p-message>
            <p-message severity="warn" variant="plain">Warn Message</p-message>
            <p-message severity="error" variant="plain">Error Message</p-message>
            <p-message severity="secondary" variant="plain">Secondary Message</p-message>
            <p-message severity="contrast" variant="plain">Contrast Message</p-message>
        </div>
        <app-code [code]="code" selector="message-plain-demo"></app-code>
    `,
})
export class PlainDoc {
    code: Code = {
        basic: `<p-message severity="success" variant="plain">Success Message</p-message>
<p-message severity="info" variant="plain">Info Message</p-message>
<p-message severity="warn" variant="plain">Warn Message</p-message>
<p-message severity="error" variant="plain">Error Message</p-message>
<p-message severity="secondary" variant="plain">Secondary Message</p-message>
<p-message severity="contrast" variant="plain">Contrast Message</p-message>`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-message severity="success" variant="plain">Success Message</p-message>
    <p-message severity="info" variant="plain">Info Message</p-message>
    <p-message severity="warn" variant="plain">Warn Message</p-message>
    <p-message severity="error" variant="plain">Error Message</p-message>
    <p-message severity="secondary" variant="plain">Secondary Message</p-message>
    <p-message severity="contrast" variant="plain">Contrast Message</p-message>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-plain-demo',
    templateUrl: './message-plain-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessagePlainDemo {}`,
    };
}
