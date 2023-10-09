import { Component, Input } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'confirm-dialog-template-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
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
            <p-confirmDialog #cd [style]="{ width: '50vw' }">
                <ng-template pTemplate="header">
                    <h3>Header Content</h3>
                </ng-template>
                <ng-template pTemplate="icon">
                    <i class="pi pi-user"></i>
                </ng-template>
                <ng-template pTemplate="message">
                    <p>Message Template</p>
                </ng-template>
                <ng-template pTemplate="footer">
                    <button type="button" pButton icon="pi pi-times" label="No" (click)="cd.reject()"></button>
                    <button type="button" pButton icon="pi pi-check" label="Yes" (click)="cd.accept()"></button>
                </ng-template>
            </p-confirmDialog>
            <p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>
        </div>
        <app-code [code]="code" selector="confirm-dialog-template-demo"></app-code>
    </section>`,
    providers: [ConfirmationService, MessageService]
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm1() {
        this.confirmationService.confirm({
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

    code: Code = {
        basic: `
<p-toast></p-toast>
<p-confirmDialog #cd [style]="{ width: '50vw' }">
    <ng-template pTemplate="header">
        <h3>Header Content</h3>
    </ng-template>
    <ng-template pTemplate="icon">
        <i class="pi pi-user"></i>
    </ng-template>
    <ng-template pTemplate="message">
        <p>Message Template</p>
    </ng-template>
    <ng-template pTemplate="footer">
        <button type="button" pButton icon="pi pi-times" label="No" (click)="cd.reject()"></button>
        <button type="button" pButton icon="pi pi-check" label="Yes" (click)="cd.accept()"></button>
    </ng-template>
</p-confirmDialog>
<p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-confirmDialog #cd [style]="{ width: '50vw' }">
        <ng-template pTemplate="header">
            <h3>Header Content</h3>
        </ng-template>
        <ng-template pTemplate="icon">
            <i class="pi pi-user"></i>
        </ng-template>
        <ng-template pTemplate="message">
            <p>Message Template</p>
        </ng-template>
        <ng-template pTemplate="footer">
            <button type="button" pButton icon="pi pi-times" label="No" (click)="cd.reject()"></button>
            <button type="button" pButton icon="pi pi-check" label="Yes" (click)="cd.accept()"></button>
        </ng-template>
    </p-confirmDialog>
    <p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
        
@Component({
    selector: 'confirm-dialog-template-demo',
    templateUrl: './confirm-dialog-template-demo.html',
    providers: [ConfirmationService, MessageService]
})
export class ConfirmTemplateDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm1() {
        this.confirmationService.confirm({
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
}`
    };
}
