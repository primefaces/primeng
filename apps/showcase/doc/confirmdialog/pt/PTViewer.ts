import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'confirmdialog-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ConfirmDialogModule],
    providers: [ConfirmationService],
    template: `
        <app-docptviewer [docs]="docs">
            <p-confirmDialog [style]="{ width: '25rem' }"></p-confirmDialog>
        </app-docptviewer>
    `
})
export class PTViewer implements OnInit {
    docs = [
        {
            data: getPTOptions('ConfirmDialog'),
            key: 'ConfirmDialog'
        }
    ];

    constructor(private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Save'
            }
        });
    }
}
