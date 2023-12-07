import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'confirm-dialog-position-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>position</i> property of the confirm options is used to display a Dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap flex-column align-items-center gap-2">
            <p-toast></p-toast>
            <p-confirmDialog key="positionDialog" [position]="position" rejectButtonStyleClass="p-button-outlined"></p-confirmDialog>
            <div class="flex flex-wrap justify-content-center gap-2">
                <p-button (click)="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
                <p-button (click)="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
            </div>
            <div class="flex flex-wrap justify-content-center gap-2">
                <p-button (click)="confirmPosition('top-left')" icon="pi pi-arrow-down" label="TopLeft" styleClass="p-button-warning"></p-button>
                <p-button (click)="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
                <p-button (click)="confirmPosition('top-right')" icon="pi pi-arrow-down" label="TopRight" styleClass="p-button-warning"></p-button>
            </div>
            <div class="flex flex-wrap justify-content-center gap-2">
                <p-button (click)="confirmPosition('bottom-left')" icon="pi pi-arrow-up" label="BottomLeft" styleClass="p-button-success"></p-button>
                <p-button (click)="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
                <p-button (click)="confirmPosition('bottom-right')" icon="pi pi-arrow-up" label="BottomRight" styleClass="p-button-success"></p-button>
            </div>
        </div>
        <app-code [code]="code" selector="confirm-dialog-position-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class PositionDoc {
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

    code: Code = {
        basic: `<p-toast></p-toast>
    <p-confirmDialog key="positionDialog" [position]="position" rejectButtonStyleClass="p-button-outlined"></p-confirmDialog>
    <div class="flex flex-wrap justify-content-center gap-2">
        <p-button (click)="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
        <p-button (click)="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
    </div>
    <div class="flex flex-wrap justify-content-center gap-2">
        <p-button (click)="confirmPosition('top-left')" icon="pi pi-arrow-down" label="TopLeft" styleClass="p-button-warning"></p-button>
        <p-button (click)="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
        <p-button (click)="confirmPosition('top-right')" icon="pi pi-arrow-down" label="TopRight" styleClass="p-button-warning"></p-button>
    </div>
    <div class="flex flex-wrap justify-content-center gap-2">
        <p-button (click)="confirmPosition('bottom-left')" icon="pi pi-arrow-up" label="BottomLeft" styleClass="p-button-success"></p-button>
        <p-button (click)="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
        <p-button (click)="confirmPosition('bottom-right')" icon="pi pi-arrow-up" label="BottomRight" styleClass="p-button-success"></p-button>
</div>`,

        html: `<div class="card flex flex-wrap flex-column align-items-center gap-2">
<p-toast></p-toast>
<p-confirmDialog key="positionDialog" [position]="position" rejectButtonStyleClass="p-button-outlined"></p-confirmDialog>
<div class="flex flex-wrap justify-content-center gap-2">
    <p-button (click)="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
    <p-button (click)="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
</div>
<div class="flex flex-wrap justify-content-center gap-2">
    <p-button (click)="confirmPosition('top-left')" icon="pi pi-arrow-down" label="TopLeft" styleClass="p-button-warning"></p-button>
    <p-button (click)="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
    <p-button (click)="confirmPosition('top-right')" icon="pi pi-arrow-down" label="TopRight" styleClass="p-button-warning"></p-button>
</div>
<div class="flex flex-wrap justify-content-center gap-2">
    <p-button (click)="confirmPosition('bottom-left')" icon="pi pi-arrow-up" label="BottomLeft" styleClass="p-button-success"></p-button>
    <p-button (click)="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
    <p-button (click)="confirmPosition('bottom-right')" icon="pi pi-arrow-up" label="BottomRight" styleClass="p-button-success"></p-button>
</div>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
        
@Component({
    selector: 'confirm-dialog-position-demo',
    templateUrl: './confirm-dialog-position-demo.html',
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
