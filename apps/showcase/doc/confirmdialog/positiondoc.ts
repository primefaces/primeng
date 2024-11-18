import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'confirm-dialog-position-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>position</i> property of the confirm options is used to display a Dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-confirmdialog key="positionDialog" [position]="position" />
            <div class="flex flex-wrap justify-center gap-2 mb-4">
                <p-button (click)="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" styleClass="min-w-40" />
                <p-button (click)="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" styleClass="min-w-40" />
            </div>
            <div class="flex flex-wrap justify-center gap-2 mb-4">
                <p-button (click)="confirmPosition('topleft')" icon="pi pi-arrow-down" label="TopLeft" severity="secondary" styleClass="min-w-40" />
                <p-button (click)="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" styleClass="min-w-40" />
                <p-button (click)="confirmPosition('topright')" icon="pi pi-arrow-down" label="TopRight" severity="secondary" styleClass="min-w-40" />
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <p-button (click)="confirmPosition('bottomleft')" icon="pi pi-arrow-up" label="BottomLeft" severity="secondary" styleClass="min-w-40" />
                <p-button (click)="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" styleClass="min-w-40" />
                <p-button (click)="confirmPosition('bottomright')" icon="pi pi-arrow-up" label="BottomRight" severity="secondary" styleClass="min-w-40" />
            </div>
        </div>
        <app-code [code]="code" selector="confirm-dialog-position-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class PositionDoc {
    position: string = 'center';

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirmPosition(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'p-button-text',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                text: true
            },
            acceptButtonProps: {
                label: 'Save',
                text: true
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'Process incomplete',
                    life: 3000
                });
            },
            key: 'positionDialog'
        });
    }

    code: Code = {
        basic: `<p-toast />
<p-confirmdialog key="positionDialog" [position]="position"/>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <p-button
            (click)="confirmPosition('left')"
            icon="pi pi-arrow-right"
            label="Left"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('right')"
            icon="pi pi-arrow-left"
            label="Right"
            severity="secondary"
            styleClass="min-w-40"
        />
    </div>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <p-button
            (click)="confirmPosition('topleft')"
            icon="pi pi-arrow-down"
            label="TopLeft"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('top')"
            icon="pi pi-arrow-down"
            label="Top"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('topright')"
            icon="pi pi-arrow-down"
            label="TopRight"
            severity="secondary"
            styleClass="min-w-40"
        />
    </div>
    <div class="flex flex-wrap justify-center gap-2">
        <p-button
            (click)="confirmPosition('bottomleft')"
            icon="pi pi-arrow-up"
            label="BottomLeft"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('bottom')"
            icon="pi pi-arrow-up"
            label="Bottom"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('bottomright')"
            icon="pi pi-arrow-up"
            label="BottomRight"
            severity="secondary"
            styleClass="min-w-40"
        />
</div>`,

        html: `<div class="card">
    <p-toast />
    <p-confirmdialog key="positionDialog" [position]="position"/>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <p-button
            (click)="confirmPosition('left')"
            icon="pi pi-arrow-right"
            label="Left"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('right')"
            icon="pi pi-arrow-left"
            label="Right"
            severity="secondary"
            styleClass="min-w-40"
        />
    </div>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <p-button
            (click)="confirmPosition('topleft')"
            icon="pi pi-arrow-down"
            label="TopLeft"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('top')"
            icon="pi pi-arrow-down"
            label="Top"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('topright')"
            icon="pi pi-arrow-down"
            label="TopRight"
            severity="secondary"
            styleClass="min-w-40"
        />
    </div>
    <div class="flex flex-wrap justify-center gap-2">
        <p-button
            (click)="confirmPosition('bottomleft')"
            icon="pi pi-arrow-up"
            label="BottomLeft"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('bottom')"
            icon="pi pi-arrow-up"
            label="Bottom"
            severity="secondary"
            styleClass="min-w-40"
        />
        <p-button
            (click)="confirmPosition('bottomright')"
            icon="pi pi-arrow-up"
            label="BottomRight"
            severity="secondary"
            styleClass="min-w-40"
        />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'confirm-dialog-position-demo',
    templateUrl: './confirm-dialog-position-demo.html',
    standalone: true,
    imports: [ConfirmDialog, ButtonModule, ToastModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogPositionDemo {
    position: string = 'center';

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirmPosition(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'p-button-text',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                text: true,
            },
            acceptButtonProps: {
                label: 'Save',
                text: true,
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'Process incomplete',
                    life: 3000,
                });
            },
            key: 'positionDialog',
        });
    }
}`
    };
}
