import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'simple-doc',
    template: `
        <app-docsectiontext>
            <p>Configure the <i>variant</i> value as <i>simple</i> for messages without borders and backgrounds.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-message severity="success" variant="simple">Success Message</p-message>
            <p-message severity="info" variant="simple">Info Message</p-message>
            <p-message severity="warn" variant="simple">Warn Message</p-message>
            <p-message severity="error" variant="simple">Error Message</p-message>
            <p-message severity="secondary" variant="simple">Secondary Message</p-message>
            <p-message severity="contrast" variant="simple">Contrast Message</p-message>
        </div>
        <app-code [code]="code" selector="message-simple-demo"></app-code>
    `
})
export class SimpleDoc {
    code: Code = {
        basic: `<p-message severity="success" variant="simple">Success Message</p-message>
<p-message severity="info" variant="simple">Info Message</p-message>
<p-message severity="warn" variant="simple">Warn Message</p-message>
<p-message severity="error" variant="simple">Error Message</p-message>
<p-message severity="secondary" variant="simple">Secondary Message</p-message>
<p-message severity="contrast" variant="simple">Contrast Message</p-message>`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-message severity="success" variant="simple">Success Message</p-message>
    <p-message severity="info" variant="simple">Info Message</p-message>
    <p-message severity="warn" variant="simple">Warn Message</p-message>
    <p-message severity="error" variant="simple">Error Message</p-message>
    <p-message severity="secondary" variant="simple">Secondary Message</p-message>
    <p-message severity="contrast" variant="simple">Contrast Message</p-message>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-simple-demo',
    templateUrl: './message-simple-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageSimpleDemo {}`
    };
}
