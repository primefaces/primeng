import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-dialog-headless-demo',
    template: `
        <app-docsectiontext>
            <p><i>Headless</i> mode allows you to customize the entire user interface instead of the default elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast />
            <p-confirmDialog #cd>
                <ng-template pTemplate="headless" let-message>
                    <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem">
                            <i class="pi pi-question text-5xl"></i>
                        </div>
                        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                        <p class="mb-0">{{ message.message }}</p>
                        <div class="flex align-items-center gap-2 mt-4">
                            <button pButton label="Save" (click)="cd.accept()" class="w-8rem"></button>
                            <button pButton label="Cancel" (click)="cd.reject()" class="p-button-outlined w-8rem "></button>
                        </div>
                    </div>
                </ng-template>
            </p-confirmDialog>
            <p-button (onClick)="confirm()" icon="pi pi-check" label="Confirm" />
        </div>
        <app-code [code]="code" selector="confirm-dialog-headless-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class HeadlessDoc {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
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
<p-confirmDialog #cd>
    <ng-template pTemplate="headless" let-message>
        <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
            <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem">
                <i class="pi pi-question text-5xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-4">
                {{ message.header }}
            </span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex align-items-center gap-2 mt-4">
                <button 
                    pButton 
                    label="Save" 
                    (click)="cd.accept()" 
                    class="w-8rem">
                </button>
                <button 
                    pButton 
                    label="Cancel" 
                    (click)="cd.reject()" 
                    class="p-button-outlined w-8rem ">
                </button>
            </div>
        </div>
    </ng-template>
</p-confirmDialog>
<p-button (onClick)="confirm()" icon="pi pi-check" label="Confirm" />`,

        html: `<div class="card flex justify-content-center">
<p-toast />
<p-confirmDialog #cd>
    <ng-template pTemplate="headless" let-message>
        <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
            <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem">
                <i class="pi pi-question text-5xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-4">
                {{ message.header }}
            </span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex align-items-center gap-2 mt-4">
                <button 
                    pButton 
                    label="Save" 
                    (click)="cd.accept()" 
                    class="w-8rem">
                </button>
                <button 
                    pButton 
                    label="Cancel"
                    (click)="cd.reject()" 
                    class="p-button-outlined w-8rem ">
                </button>
            </div>
        </div>
    </ng-template>
</p-confirmDialog>
<p-button (onClick)="confirm()" icon="pi pi-check" label="Confirm" />
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
