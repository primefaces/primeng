import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'toast-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ToastModule, ButtonModule],
    providers: [MessageService],
    template: `
        <app-docptviewer [docs]="docs">
            <p-toast key="tst"></p-toast>
            <div class="flex gap-2">
                <p-button (click)="showSuccess()" label="Success" severity="success"></p-button>
                <p-button (click)="showInfo()" label="Info" severity="info"></p-button>
                <p-button (click)="showWarn()" label="Warn" severity="warn"></p-button>
                <p-button (click)="showError()" label="Error" severity="danger"></p-button>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    constructor(private messageService: MessageService) {}

    docs = [
        {
            data: getPTOptions('Toast'),
            key: 'Toast'
        }
    ];

    showSuccess() {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    showInfo() {
        this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showWarn() {
        this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Warning', detail: 'Message Content' });
    }

    showError() {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Message Content' });
    }
}
