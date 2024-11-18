import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'confirm-dialog-basic-demo',
    template: `
        <app-docsectiontext>
            <p>ConfirmDialog is defined using <i>p-confirmDialog</i> tag and an instance of <i>ConfirmationService</i> is required to display it bycalling confirm method.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-toast />
            <p-confirmdialog />
            <p-button (click)="confirm1($event)" label="Save" [outlined]="true" />
            <p-button (click)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />
        </div>
        <app-code [code]="code" selector="confirm-dialog-basic-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class BasicDoc {
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Save'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000
                });
            }
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    code: Code = {
        basic: `<p-toast />
<p-confirmdialog />
<p-button (click)="confirm1($event)" label="Save" [outlined]="true" />
<p-button (click)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />`,

        html: `<div class="card flex justify-center gap-2">
    <p-toast />
    <p-confirmdialog />
    <p-button (click)="confirm1($event)" label="Save" [outlined]="true" />
    <p-button (click)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-dialog-basic-demo',
    templateUrl: './confirm-dialog-basic-demo.html',
    standalone: true,
    imports: [ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogBasicDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Save',
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                });
            },
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
}`
    };
}
