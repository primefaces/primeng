import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-dialog-headless-demo',
    template: `
        <app-docsectiontext>
            <p>
                <i>Headless</i> mode allows you to customize the entire user interface instead of the default elements.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast />
            <p-confirmDialog #cd>
                <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
                    <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div
                            class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem"
                        >
                            <i class="pi pi-question text-5xl"></i>
                        </div>
                        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                        <p class="mb-0">{{ message.message }}</p>
                        <div class="flex align-items-center gap-2 mt-4">
                            <p-button label="Save" (onClick)="onAccept()" styleClass="w-8rem"></p-button>
                            <p-button label="Cancel" (onClick)="onReject()" styleClass="w-8rem"></p-button>
                        </div>
                    </div>
                </ng-template>
            </p-confirmDialog>
            <p-button (click)="confirm()" icon="pi pi-check" label="Confirm" />
        </div>
        <app-code [code]="code" selector="confirm-dialog-headless-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService],
})
export class HeadlessDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }

    code: Code = {
        basic: `<p-confirmDialog #cd>
    <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
        <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
            <div
                class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem"
            >
                <i class="pi pi-question text-5xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex align-items-center gap-2 mt-4">
                <p-button label="Save" (onClick)="onAccept()" styleClass="w-8rem"></p-button>
                <p-button label="Cancel" (onClick)="onReject()" styleClass="w-8rem"></p-button>
            </div>
        </div>
    </ng-template>
</p-confirmDialog>`,

        html: `div class="card flex justify-content-center">
    <p-toast />
    <p-confirmDialog #cd>
        <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
            <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                <div
                    class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem"
                >
                    <i class="pi pi-question text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex align-items-center gap-2 mt-4">
                    <p-button label="Save" (onClick)="onAccept()" styleClass="w-8rem"></p-button>
                    <p-button label="Cancel" (onClick)="onReject()" styleClass="w-8rem"></p-button>
                </div>
            </div>
        </ng-template>
    </p-confirmDialog>
    <p-button (click)="confirm()" icon="pi pi-check" label="Confirm" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
  
@Component({
    selector: 'confirm-dialog-headless-demo',
    templateUrl: './confirm-dialog-headless-demo.html',
    standalone: true,
    imports: [ConfirmDialogModule, ButtonModule, ToastModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogHeadlessDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
}`,
    };
}
