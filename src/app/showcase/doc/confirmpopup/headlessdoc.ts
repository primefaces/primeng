import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';
import { ConfirmPopup } from 'primeng/confirmpopup';
@Component({
    selector: 'confirm-popup-headless-demo',
    template: `
        <app-docsectiontext>
        <p><i>Headless</i> mode allows you to customize the entire user interface instead of the default elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-confirmPopup #confirmPopupRef>
                <ng-template pTemplate="headless" let-message let-test>
                    <div class="bg-gray-900 text-white border-round p-3">
                        <span>{{ message.message }}</span>
                        <div class="flex align-items-center gap-2 mt-3">
                            <button (click)="accept()" pButton label="Save" class="p-button-sm p-button-outlined"></button>
                            <button (click)="reject()" pButton label="Cancel" class="p-button-sm p-button-text"></button>
                        </div>
                    </div>
                </ng-template>
            </p-confirmPopup>
            <p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>
        </div>
        <app-code [code]="code" selector="confirm-popup-headless-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class HeadlessDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

    accept() {
        this.confirmPopup.accept();
    }

    reject() {
        this.confirmPopup.reject();
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure? You cannot undo this.',
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
    <p-confirmPopup #confirmPopupRef>
        <ng-template pTemplate="headless" let-message let-test>
            <div class="bg-gray-900 text-white border-round p-3">
                <span>{{ message.message }}</span>
                <div class="flex align-items-center gap-2 mt-3">
                    <button (click)="accept()" pButton label="Save" class="p-button-sm p-button-outlined"></button>
                    <button (click)="reject()" pButton label="Cancel" class="p-button-sm p-button-text"></button>
                </div>
            </div>
        </ng-template>
    </p-confirmPopup>
<p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>`,

        html: `<div class="card flex justify-content-center gap-2">
    <p-toast></p-toast>
    <p-confirmPopup #confirmPopupRef>
        <ng-template pTemplate="headless" let-message let-test>
            <div class="bg-gray-900 text-white border-round p-3">
                <span>{{ message.message }}</span>
                <div class="flex align-items-center gap-2 mt-3">
                    <button (click)="accept()" pButton label="Save" class="p-button-sm p-button-outlined"></button>
                    <button (click)="reject()" pButton label="Cancel" class="p-button-sm p-button-text"></button>
                </div>
            </div>
        </ng-template>
    </p-confirmPopup>
<p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>`,

        typescript: `
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';

@Component({
    selector: 'confirm-popup-headless-demo',
    templateUrl: './confirm-popup-headless-demo.html',
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupHeadlessDemo {
   constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

    accept() {
        this.confirmPopup.accept();
    }

    reject() {
        this.confirmPopup.reject();
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure? You cannot undo this.',
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
