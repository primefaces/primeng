import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'confirm-popup-template-demo',
    template: `
        <app-docsectiontext>
            <p>Content section can be customized using <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-confirmPopup>
                <ng-template pTemplate="content" let-message>
                    <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border p-3 mb-3">
                        <i [class]="message.icon" class="text-6xl text-primary-500"></i>
                        <p>{{ message.message }}</p>
                    </div>
                </ng-template>
            </p-confirmPopup>
            <p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>
        </div>
        <app-code [code]="code" selector="confirm-popup-template-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class TemplateDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            rejectButtonStyleClass: 'p-button-danger p-button-sm',
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
    <p-confirmPopup>
        <ng-template pTemplate="content" let-message>
            <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border p-3 mb-3">
                <i [class]="message.icon" class="text-6xl text-primary-500"></i>
                <p>{{ message.message }}</p>
            </div>
        </ng-template>
    </p-confirmPopup>
<p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>`,

        html: `<div class="card flex justify-content-center gap-2">
        <p-toast></p-toast>
        <p-confirmPopup>
            <ng-template pTemplate="content" let-message>
                <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border p-3 mb-3">
                    <i [class]="message.icon" class="text-6xl text-primary-500"></i>
                    <p>{{ message.message }}</p>
                </div>
            </ng-template>
        </p-confirmPopup>
    <p-button (click)="confirm($event)" icon="pi pi-check" label="Confirm"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
        
@Component({
    selector: 'confirm-popup-template-demo',
    templateUrl: './confirm-popup-template-demo.html',
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupTemplateDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
    
    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            rejectButtonStyleClass: 'p-button-danger p-button-sm',
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
