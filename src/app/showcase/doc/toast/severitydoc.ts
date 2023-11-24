import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>
                The <i>severity</i> option specifies the type of the message. There are four types of messages: <i>success</i>, <i>info</i>, <i>warn</i> and <i>error</i>. The severity of the message is used to display the icon and the color of the
                toast.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast></p-toast>
            <button type="button" pButton pRipple (click)="showSuccess()" label="Success" class="p-button-success"></button>
            <button type="button" pButton pRipple (click)="showInfo()" label="Info" class="p-button-info"></button>
            <button type="button" pButton pRipple (click)="showWarn()" label="Warn" class="p-button-warning"></button>
            <button type="button" pButton pRipple (click)="showError()" label="Error" class="p-button-danger"></button>
        </div>
        <app-code [code]="code" selector="toast-severity-demo"></app-code>
    `,
    providers: [MessageService]
})
export class SeverityDoc {
    constructor(private messageService: MessageService) {}

    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    showInfo() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showWarn() {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<button type="button" pButton pRipple (click)="showSuccess()" label="Success" class="p-button-success"></button>
<button type="button" pButton pRipple (click)="showInfo()" label="Info" class="p-button-info"></button>
<button type="button" pButton pRipple (click)="showWarn()" label="Warn" class="p-button-warning"></button>
<button type="button" pButton pRipple (click)="showError()" label="Error" class="p-button-danger"></button>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-toast></p-toast>
    <button type="button" pButton pRipple (click)="showSuccess()" label="Success" class="p-button-success"></button>
    <button type="button" pButton pRipple (click)="showInfo()" label="Info" class="p-button-info"></button>
    <button type="button" pButton pRipple (click)="showWarn()" label="Warn" class="p-button-warning"></button>
    <button type="button" pButton pRipple (click)="showError()" label="Error" class="p-button-danger"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-severity-demo',
    templateUrl: './toast-severity-demo.html',
    providers: [MessageService]
})
export class ToastSeverityDemo {
    constructor(private messageService: MessageService) {}

    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    showInfo() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showWarn() {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    }
}`
    };
}
