import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [CommonModule, ConfirmPopupModule, ToastModule, ButtonModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Content section can be customized using <i>content</i> template.</p>
        </app-docsectiontext>
        <p-toast />
        <p-confirmpopup>
            <ng-template #content let-message>
                <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                    <i [class]="message.icon" class="text-5xl! text-primary-500"></i>
                    <p class="text-sm">{{ message.message }}</p>
                </div>
            </ng-template>
        </p-confirmpopup>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-button (click)="confirm($event)" label="Save" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [ConfirmationService, MessageService]
})
export class TemplateDoc {
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                icon: 'pi pi-times',
                label: 'Cancel',
                outlined: true
            },
            acceptButtonProps: {
                icon: 'pi pi-check',
                label: 'Confirm'
            },
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                    life: 3000
                });
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
}
