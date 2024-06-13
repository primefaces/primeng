import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-popup-basic-demo',
    template: `
        <app-docsectiontext>
            <p>ConfirmPopup is defined using <i>p-confirmPopup</i> tag and an instance of <i>ConfirmationService</i> is required to display it bycalling confirm method.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast />
            <p-confirmPopup />
            <p-button (click)="confirm1($event)" label="Save" [outlined]="true" />
            <p-button (click)="confirm2($event)" label="Delete" severity="danger" [outlined]="true" />
        </div>
        <app-code [code]="code" selector="confirm-popup-basic-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class BasicDoc {
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    code: Code = {
        basic: `<p-toast />
<p-confirmPopup />
<p-button 
    (click)="confirm1($event)" 
    label="Save" 
    [outlined]="true" />
<p-button 
    (click)="confirm2($event)" 
    label="Delete" 
    severity="danger" 
    [outlined]="true" />`,

        html: `<div class="card flex justify-content-center gap-2">
    <p-toast />
    <p-confirmPopup />
    <p-button 
        (click)="confirm1($event)" 
        label="Save" 
        [outlined]="true" />
    <p-button 
        (click)="confirm2($event)" 
        label="Delete" 
        severity="danger" 
        [outlined]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
    selector: 'confirm-popup-basic-demo',
    templateUrl: './confirm-popup-basic-demo.html',
    standalone: true,
    imports: [ButtonModule, ToastModule, ConfirmPopupModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmPopupBasicDemo {
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
    
    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
}`
    };
}
