import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>severity</i> option specifies the type of the message.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-message severity="success">Success Message</p-message>
            <p-message severity="info">Info Message</p-message>
            <p-message severity="warn">Warn Message</p-message>
            <p-message severity="error">Error Message</p-message>
            <p-message severity="secondary">Secondary Message</p-message>
            <p-message severity="contrast">Contrast Message</p-message>
        </div>
        <app-code [code]="code" selector="message-severity-demo"></app-code>
    `
})
export class SeverityDoc {
    code: Code = {
        basic: `<p-message severity="success">Success Message</p-message>
<p-message severity="info">Info Message</p-message>
<p-message severity="warn">Warn Message</p-message>
<p-message severity="error">Error Message</p-message>
<p-message severity="secondary">Secondary Message</p-message>
<p-message severity="contrast">Contrast Message</p-message>`,
        html: `<div class="card flex flex-wrap gap-4 justify-center">
    <p-message severity="success">Success Message</p-message>
    <p-message severity="info">Info Message</p-message>
    <p-message severity="warn">Warn Message</p-message>
    <p-message severity="error">Error Message</p-message>
    <p-message severity="secondary">Secondary Message</p-message>
    <p-message severity="contrast">Contrast Message</p-message>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
    selector: 'message-severity-demo',
    templateUrl: './message-severity-demo.html',
    standalone: true,
    imports: [Message]
})
export class MessageSeverityDemo {}`
    };
}
