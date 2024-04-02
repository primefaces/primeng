import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-dialog-template-demo',
    template: `
        <app-docsectiontext>
            <p>
                Properties of the dialog are defined in two ways, <i>message</i>, <i>icon</i>, <i>header</i> properties can either be defined using confirm method or declaratively on p-confirmDialog ng-template by <i>header</i>, <i>message</i>,
                <i>icon</i> and <i>footer</i> templates. If these values are unlikely to change then declarative approach would be useful, still properties defined in a ng-template can be overridden with confirm method call.
            </p>
            <p>
                In addition, buttons at footer section can be customized by passing your own UI, important note to make confirmation work with a custom UI is defining a local ng-template variable for the dialog and assign accept()-reject() methods to
                your own buttons.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-confirmDialog>
                <ng-template pTemplate="message" let-message>
                    <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                        <i class="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                        <p>{{ message.message }}</p>
                    </div>
                </ng-template>
            </p-confirmDialog>
            <p-button (click)="confirm()" icon="pi pi-check" label="Confirm"></p-button>
        </div>
        <app-code [code]="code" selector="confirm-dialog-template-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class TemplateDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            acceptIcon: 'pi pi-check mr-2',
            rejectIcon: 'pi pi-times mr-2',
            rejectButtonStyleClass: 'p-button-sm',
            acceptButtonStyleClass: 'p-button-outlined p-button-sm',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    code: Code = {
        basic: `<p-toast></p-toast>
        <p-confirmDialog>
            <ng-template pTemplate="message" let-message>
                <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i class="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <p>{{ message.message }}</p>
                </div>
            </ng-template>
        </p-confirmDialog>
<p-button (click)="confirm()" icon="pi pi-check" label="Confirm"></p-button>`,

        html: `<div class="card flex justify-content-center">
<p-toast></p-toast>
<p-confirmDialog>
    <ng-template pTemplate="message" let-message>
        <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
            <i class="pi pi-exclamation-circle text-6xl text-primary-500"></i>
            <p>{{ message.message }}</p>
        </div>
    </ng-template>
</p-confirmDialog>
<p-button (click)="confirm()" icon="pi pi-check" label="Confirm"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
        
@Component({
    selector: 'confirm-dialog-template-demo',
    templateUrl: './confirm-dialog-template-demo.html',
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogTemplateDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            acceptIcon: 'pi pi-check mr-2',
            rejectIcon: 'pi pi-times mr-2',
            rejectButtonStyleClass: 'p-button-sm',
            acceptButtonStyleClass: 'p-button-outlined p-button-sm',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

}`
    };
}
