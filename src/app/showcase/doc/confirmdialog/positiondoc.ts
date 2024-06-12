import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-dialog-position-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>position</i> property of the confirm options is used to display a Dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap flex-column align-items-center gap-2">
            <p-toast />
            <p-confirmDialog key="positionDialog" [position]="position" rejectButtonStyleClass="p-button-outlined" />
            <div class="flex flex-wrap justify-content-center gap-2">
                <p-button (click)="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" />
                <p-button (click)="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" />
            </div>
            <div class="flex flex-wrap justify-content-center gap-2">
                <p-button (click)="confirmPosition('top-left')" icon="pi pi-arrow-down" label="TopLeft" severity="secondary" />
                <p-button (click)="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" />
                <p-button (click)="confirmPosition('top-right')" icon="pi pi-arrow-down" label="TopRight" severity="secondary" />
            </div>
            <div class="flex flex-wrap justify-content-center gap-2">
                <p-button (click)="confirmPosition('bottom-left')" icon="pi pi-arrow-up" label="BottomLeft" severity="secondary" />
                <p-button (click)="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" />
                <p-button (click)="confirmPosition('bottom-right')" icon="pi pi-arrow-up" label="BottomRight" severity="secondary" />
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
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Process incomplete', life: 3000 });
            },
            key: 'positionDialog'
        });
    }

    code: Code = {
        basic: `<p-toast />
<p-confirmDialog 
    key="positionDialog" 
    [position]="position" 
    rejectButtonStyleClass="p-button-outlined" />

<div class="flex flex-wrap justify-content-center gap-2">
    <p-button 
        (click)="confirmPosition('left')" 
        icon="pi pi-arrow-right" 
        label="Left" 
        severity="secondary" />
    <p-button 
        (click)="confirmPosition('right')" 
        icon="pi pi-arrow-left" 
        label="Right" 
        severity="secondary" />
</div>
<div class="flex flex-wrap justify-content-center gap-2">
    <p-button 
        (click)="confirmPosition('top-left')" 
        icon="pi pi-arrow-down" 
        label="TopLeft" 
        severity="secondary" />
    <p-button 
        (click)="confirmPosition('top')" 
        icon="pi pi-arrow-down" 
        label="Top" 
        severity="secondary" />
    <p-button 
        (click)="confirmPosition('top-right')" 
        icon="pi pi-arrow-down" 
        label="TopRight" 
        severity="secondary" />
</div>
<div class="flex flex-wrap justify-content-center gap-2">
    <p-button 
        (click)="confirmPosition('bottom-left')" 
        icon="pi pi-arrow-up" 
        label="BottomLeft" 
        severity="secondary" />
    <p-button 
        (click)="confirmPosition('bottom')" 
        icon="pi pi-arrow-up" 
        label="Bottom" 
        severity="secondary" />
    <p-button 
        (click)="confirmPosition('bottom-right')" 
        icon="pi pi-arrow-up" 
        label="BottomRight" 
        severity="secondary" />
</div>`,

        html: `<div class="card flex flex-wrap flex-column align-items-center gap-2">
    <p-toast />
    <p-confirmDialog 
        key="positionDialog" 
        [position]="position" 
        rejectButtonStyleClass="p-button-outlined" />

    <div class="flex flex-wrap justify-content-center gap-2">
        <p-button 
            (click)="confirmPosition('left')" 
            icon="pi pi-arrow-right" 
            label="Left" 
            severity="secondary" />
        <p-button 
            (click)="confirmPosition('right')" 
            icon="pi pi-arrow-left" 
            label="Right" 
            severity="secondary" />
    </div>
    <div class="flex flex-wrap justify-content-center gap-2">
        <p-button 
            (click)="confirmPosition('top-left')" 
            icon="pi pi-arrow-down" 
            label="TopLeft" 
            severity="secondary" />
        <p-button 
            (click)="confirmPosition('top')" 
            icon="pi pi-arrow-down" 
            label="Top" 
            severity="secondary" />
        <p-button 
            (click)="confirmPosition('top-right')" 
            icon="pi pi-arrow-down" 
            label="TopRight" 
            severity="secondary" />
    </div>
    <div class="flex flex-wrap justify-content-center gap-2">
        <p-button 
            (click)="confirmPosition('bottom-left')" 
            icon="pi pi-arrow-up" 
            label="BottomLeft" 
            severity="secondary" />
        <p-button 
            (click)="confirmPosition('bottom')" 
            icon="pi pi-arrow-up" 
            label="Bottom" 
            severity="secondary" />
        <p-button 
            (click)="confirmPosition('bottom-right')" 
            icon="pi pi-arrow-up" 
            label="BottomRight" 
            severity="secondary" />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
             
@Component({
    selector: 'confirm-dialog-position-demo',
    templateUrl: './confirm-dialog-position-demo.html',
    standalone: true,
    imports: [ConfirmDialogModule, ButtonModule, ToastModule],
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
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Request submitted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Process incomplete', life: 3000 });
            },
            key: 'positionDialog'
        });
    }
}`
    };
}
