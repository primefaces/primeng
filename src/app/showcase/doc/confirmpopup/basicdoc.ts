import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'confirm-popup-basic-demo',
    template: `
        <app-docsectiontext>
            <p>ConfirmDialog is defined using <i>p-confirmDialog</i> tag and an instance of <i>ConfirmationService</i> is required to display it bycalling confirm method.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast></p-toast>
            <p-confirmPopup></p-confirmPopup>
            <p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>
        </div>
        <app-code [code]="code" selector="confirm-popup-basic-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class BasicDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    code: Code = {
        basic: `<p-toast></p-toast>
<p-confirmPopup></p-confirmPopup>
<p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>`,

        html: `
<div class="card flex justify-content-center gap-2">
    <p-toast></p-toast>
    <p-confirmPopup></p-confirmPopup>
    <p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
        
@Component({
    selector: 'confirm-popup-basic-demo',
    templateUrl: './confirm-popup-basic-demo.html',
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupBasicDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
    
    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }
}`
    };
}
