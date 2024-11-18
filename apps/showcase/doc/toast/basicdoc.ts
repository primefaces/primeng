import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                Toasts are displayed by calling the <i>add</i> and <i>addAll</i> method provided by the <i>messageService</i>. A single toast is specified by the <i>Message</i> interface that defines various properties such as <i>severity</i>,
                <i>summary</i> and <i>detail</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-button (onClick)="show()" label="Show" />
        </div>
        <app-code [code]="code" selector="toast-basic-demo"></app-code>
    `,
    providers: [MessageService]
})
export class BasicDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
    }

    code: Code = {
        basic: `<p-toast />
<p-button (onClick)="show()" label="Show" />`,
        html: `<div class="card flex justify-center">
    <p-toast />
    <p-button (onClick)="show()" label="Show" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'toast-basic-demo',
    templateUrl: './toast-basic-demo.html',
    standalone: true,
    imports: [Toast, ButtonModule, Ripple],
    providers: [MessageService]
})
export class ToastBasicDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
    }
}`
    };
}
