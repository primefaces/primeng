import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'splitbutton-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, SplitButtonModule, ToastModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-toast />
            <p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
        </app-docptviewer>
    `
})
export class PTViewer {
    items: MenuItem[];

    constructor() {
        this.items = [
            {
                label: 'Update'
            },
            {
                label: 'Delete'
            },
            { label: 'Angular.dev', url: 'https://angular.dev' }
        ];
    }

    docs = [
        {
            data: getPTOptions('SplitButton'),
            key: 'SplitButton'
        }
    ];
}
