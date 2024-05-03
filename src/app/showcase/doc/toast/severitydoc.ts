import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

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
            <p-toast />
            <p-button type="button" pRipple (click)="showSuccess()" label="Success" severity="success" />
            <p-button type="button" pRipple (click)="showInfo()" label="Info" severity="info" />
            <p-button type="button" pRipple (click)="showWarn()" label="Warn" severity="warning" />
            <p-button type="button" pRipple (click)="showError()" label="Error" severity="danger" />
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
        basic: `<p-toast />
<p-button 
    type="button" 
    pRipple 
    (click)="showSuccess()" 
    label="Success" 
    severity="success" />
<p-button 
    type="button"
    pRipple 
    (click)="showInfo()" 
    label="Info" 
    severity="info" />
<p-button 
    type="button" 
    pRipple 
    (click)="showWarn()" 
    label="Warn" 
    severity="warning" />
<p-button 
    type="button" 
    pRipple 
    (click)="showError()" 
    label="Error" 
    severity="danger" />`,
        html: `<div class="card flex justify-content-center gap-2">
    <p-toast />
    <p-button 
        type="button" 
        pRipple 
        (click)="showSuccess()" 
        label="Success" 
        severity="success" />
    <p-button 
        type="button"
        pRipple 
        (click)="showInfo()" 
        label="Info" 
        severity="info" />
    <p-button 
        type="button" 
        pRipple 
        (click)="showWarn()" 
        label="Warn" 
        severity="warning"  />
    <p-button 
        type="button" 
        pRipple 
        (click)="showError()" 
        label="Error" 
        severity="danger" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'toast-severity-demo',
    templateUrl: './toast-severity-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
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
