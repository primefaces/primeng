import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'confirm-popup-headless-demo',
    template: `
        <app-docsectiontext>
            <p><i>Headless</i> mode allows you to customize the entire user interface instead of the default elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-confirmpopup #cp>
                <ng-template pTemplate="headless" let-message>
                    <div class="rounded p-4">
                        <span>{{ message.message }}</span>
                        <div class="flex items-center gap-2 mt-4">
                            <p-button (onClick)="cp.onAccept()" label="Save" size="small" />
                            <p-button (onClick)="cp.onReject()" label="Cancel" [text]="true" size="small" severity="secondary" />
                        </div>
                    </div>
                </ng-template>
            </p-confirmpopup>
            <p-button (onClick)="confirm($event)" label="Save" />
        </div>
        <app-code [code]="code" selector="confirm-popup-headless-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class HeadlessDoc {
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Save your current process?',
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
    <p-confirmpopup #cp>
        <ng-template pTemplate="headless" let-message>
            <div class="rounded p-4">
                <span>{{ message.message }}</span>
                <div class="flex items-center gap-2 mt-4">
                    <p-button (onClick)="cp.onAccept()" label="Save" size="small" />
                    <p-button (onClick)="cp.onReject()" label="Cancel" [text]="true" size="small" severity="secondary" />
                </div>
            </div>
        </ng-template>
    </p-confirmpopup>
<p-button (onClick)="confirm($event)" label="Save" />`,

        html: `<div class="card flex justify-center gap-2">
    <p-toast />
    <p-confirmpopup #cp>
        <ng-template pTemplate="headless" let-message>
            <div class="rounded p-4">
                <span>{{ message.message }}</span>
                <div class="flex items-center gap-2 mt-4">
                    <p-button (onClick)="cp.onAccept()" label="Save" size="small" />
                    <p-button (onClick)="cp.onReject()" label="Cancel" [text]="true" size="small" severity="secondary" />
                </div>
            </div>
        </ng-template>
    </p-confirmpopup>
<p-button (onClick)="confirm($event)" label="Save" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-popup-headless-demo',
    templateUrl: './confirm-popup-headless-demo.html',
    standalone: true,
    imports: [ConfirmPopupModule, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupHeadlessDemo {
   constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Save your current process?',
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
