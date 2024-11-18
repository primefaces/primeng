import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'outlined-doc',
    template: `
        <app-docsectiontext>
            <p>Configure the <i>variant</i> value as <i>outlined</i> for messages with borders and no background.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-message severity="success" variant="outlined">Success Message</p-message>
            <p-message severity="info" variant="outlined">Info Message</p-message>
            <p-message severity="warn" variant="outlined">Warn Message</p-message>
            <p-message severity="error" variant="outlined">Error Message</p-message>
            <p-message severity="secondary" variant="outlined">Secondary Message</p-message>
            <p-message severity="contrast" variant="outlined">Contrast Message</p-message>
        </div>
        <app-code [code]="code" selector="message-outlined-demo"></app-code>
    `
})
export class OutlinedDoc {
    code: Code = {
        basic: `<p-message severity="success" variant="outlined">Success Message</p-message>
<p-message severity="info" variant="outlined">Info Message</p-message>
<p-message severity="warn" variant="outlined">Warn Message</p-message>
<p-message severity="error" variant="outlined">Error Message</p-message>
<p-message severity="secondary" variant="outlined">Secondary Message</p-message>
<p-message severity="contrast" variant="outlined">Contrast Message</p-message>`,

        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-message severity="success" variant="outlined">Success Message</p-message>
    <p-message severity="info" variant="outlined">Info Message</p-message>
    <p-message severity="warn" variant="outlined">Warn Message</p-message>
    <p-message severity="error" variant="outlined">Error Message</p-message>
    <p-message severity="secondary" variant="outlined">Secondary Message</p-message>
    <p-message severity="contrast" variant="outlined">Contrast Message</p-message>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-outlined-demo',
    templateUrl: './message-outlined-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageOutlinedDemo {}`
    };
}
