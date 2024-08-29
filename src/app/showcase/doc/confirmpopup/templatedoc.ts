import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-popup-template-demo',
    template: `
        <app-docsectiontext>
            <p>Content section can be customized using <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-confirmPopup>
                <ng-template pTemplate="content" let-message>
                    <div
                        class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0"
                    >
                        <i [class]="message.icon" class="text-6xl text-primary-500"></i>
                        <p>{{ message.message }}</p>
                    </div>
                </ng-template>
            </p-confirmPopup>
            <p-button (click)="confirm($event)" label="Save" />
        </div>
        <app-code [code]="code" selector="confirm-popup-template-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService],
})
export class TemplateDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                icon: 'pi pi-times',
                label: 'Cancel',
                outlined: true,
            },
            acceptButtonProps: {
                icon: 'pi pi-check',
                label: 'Confirm',
            },
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                    life: 3000,
                });
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

    code: Code = {
        basic: `<p-toast />
<p-confirmPopup>
    <ng-template pTemplate="content" let-message>
        <div
            class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0"
        >
            <i [class]="message.icon" class="text-6xl text-primary-500"></i>
            <p>{{ message.message }}</p>
        </div>
    </ng-template>
</p-confirmPopup>
<p-button (click)="confirm($event)" label="Save" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-confirmPopup>
        <ng-template pTemplate="content" let-message>
            <div
                class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0"
            >
                <i [class]="message.icon" class="text-6xl text-primary-500"></i>
                <p>{{ message.message }}</p>
            </div>
        </ng-template>
    </p-confirmPopup>
    <p-button (click)="confirm($event)" label="Save" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-popup-template-demo',
    templateUrl: './confirm-popup-template-demo.html',
    standalone: true,
    imports: [ConfirmPopupModule, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupTemplateDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
    
   
    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                icon: 'pi pi-times',
                label: 'Cancel',
                outlined: true,
            },
            acceptButtonProps: {
                icon: 'pi pi-check',
                label: 'Confirm',
            },
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                    life: 3000,
                });
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
}`,
    };
}
