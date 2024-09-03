import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Menubar requires nested menuitems as its model.</p>
        </app-docsectiontext>
        <div class="card">
            <p-message>Message Content</p-message>
        </div>
        <app-code [code]="code" selector="message-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    code: Code = {
        basic: `<p-message>Message Content</p-message>`,

        html: `<div class="card">
    <p-message>Message Content</p-message>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'message-basic-demo',
    templateUrl: './message-basic-demo.html',
    standalone: true,
    imports: [MessageModule]
})
export class MessageBasicDemo {}`,
    };
}
