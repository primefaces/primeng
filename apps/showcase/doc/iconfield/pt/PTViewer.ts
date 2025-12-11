import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'iconfield-pt-viewer',
    standalone: true,
    imports: [CommonModule, FormsModule, AppDocPtViewer, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input pInputText [(ngModel)]="value" placeholder="Search" />
            </p-iconfield>
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string | null = null;

    docs = [
        {
            data: getPTOptions('IconField'),
            key: 'IconField'
        },
        {
            data: getPTOptions('InputIcon'),
            key: 'InputIcon'
        }
    ];
}
