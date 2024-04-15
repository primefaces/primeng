import { Component } from '@angular/core';
import { MessageService } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                Toasts are displayed by calling the <i>add</i> and <i>addAll</i> method provided by the <i>messageService</i>. A single toast is specified by the <i>Message</i> interface that defines various properties such as <i>severity</i>,
                <i>summary</i> and <i>detail</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <button type="button" pButton pRipple (click)="show()" label="Show"></button>
        </div>
        <app-code [code]="code" selector="toast-basic-demo"></app-code>
    `,
    providers: [MessageService]
})
export class BasicDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    code: Code = {
        basic: `<p-toast></p-toast>
<button type="button" pButton pRipple (click)="show()" label="Show" class="p-button-success"></button>`,
        html: `
<div class="card">
    <p-toast></p-toast>
    <button type="button" pButton pRipple (click)="show()" label="Show" class="p-button-success"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from '@alamote/primeng/api';

@Component({
    selector: 'toast-basic-demo',
    templateUrl: './toast-basic-demo.html',
    providers: [MessageService]
})
export class ToastBasicDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
}`
    };
}
