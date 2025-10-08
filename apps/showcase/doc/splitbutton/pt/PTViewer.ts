import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'splitbutton-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, SplitButtonModule, ToastModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-toast />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" />
        </app-docptviewer>
    `,
    providers: [MessageService]
})
export class PTViewer {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                command: () => {
                    this.delete();
                }
            },
            { label: 'Angular.dev', url: 'https://angular.dev' }
        ];
    }

    save() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

    docs = [
        {
            data: getPTOptions('SplitButton'),
            key: 'SplitButton'
        }
    ];
}
