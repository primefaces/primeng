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
        <div class="card flex justify-center">
            <p-toast />
            <p-confirmDialog>
                <ng-template pTemplate="message" let-message>
                    <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                        <i [ngClass]="message.icon" class="!text-6xl text-primary-500"></i>
                        <p>{{ message.message }}</p>
                    </div>
                </ng-template>
            </p-confirmDialog>
            <p-button (click)="confirm()" label="Save" />
        </div>
        <app-code [code]="code" selector="confirm-dialog-template-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class TemplateDoc {
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                label: 'Cancel',
                icon: 'pi pi-times',
                outlined: true,
                size: 'small'
            },
            acceptButtonProps: {
                label: 'Save',
                icon: 'pi pi-check',
                size: 'small'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    code: Code = {
        basic: `<p-toast />
<p-confirmDialog>
    <ng-template pTemplate="message" let-message>
        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
            <i [ngClass]="message.icon" class="!text-6xl text-primary-500"></i>
            <p>{{ message.message }}</p>
        </div>
    </ng-template>
</p-confirmDialog>
<p-button (click)="confirm()" label="Save" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-confirmDialog>
        <ng-template pTemplate="message" let-message>
            <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                <i [ngClass]="message.icon" class="!text-6xl text-primary-500"></i>
                <p>{{ message.message }}</p>
            </div>
        </ng-template>
    </p-confirmDialog>
    <p-button (click)="confirm()" label="Save" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
        
@Component({
    selector: 'confirm-dialog-template-demo',
    templateUrl: './confirm-dialog-template-demo.html',
    standalone: true,
    imports: [ConfirmDialogModule, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogTemplateDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                label: 'Cancel',
                icon: 'pi pi-times',
                outlined: true,
                size: 'small'
            },
            acceptButtonProps: {
                label: 'Save',
                icon: 'pi pi-check',
                size: 'small'
            },
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
