import { Component, Input } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'confirm-dialog-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>ConfirmDialog is defined using <i>p-confirmDialog</i> tag and an instance of <i>ConfirmationService</i> is required to display it bycalling confirm method.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast></p-toast>
            <p-confirmDialog [style]="{ width: '50vw' }"></p-confirmDialog>
            <p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>
            <p-button (click)="confirm2()" icon="pi pi-times" label="Delete"></p-button>
        </div>
        <app-code [code]="code" selector="confirm-dialog-basic-demo"></app-code>
    </section>`,
    providers: [ConfirmationService, MessageService]
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm1() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }

    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<p-confirmDialog [style]="{width: '50vw'}"></p-confirmDialog>
<p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>
<p-button (click)="confirm2()" icon="pi pi-times" label="Delete" class="p-button-danger"></p-button>`,

        html: `
<div class="card flex justify-content-center gap-2">
    <p-toast></p-toast>
    <p-confirmDialog [style]="{width: '50vw'}"></p-confirmDialog>
    <p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>
    <p-button (click)="confirm2()" icon="pi pi-times" label="Delete" class="p-button-danger"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
        
@Component({
    selector: 'confirm-dialog-basic-demo',
    templateUrl: './confirm-dialog-basic-demo.html',
    providers: [ConfirmationService, MessageService]
})
export class ConfirmBasicDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm1() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: (type) => {
                switch (type: ConfirmEventType) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }

    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: (type) => {
                switch (type: ConfirmEventType) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }
}`
    };
}
