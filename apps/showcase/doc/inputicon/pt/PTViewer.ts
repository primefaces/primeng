import { Component } from '@angular/core';
import { AppDocPtViewer } from '@/components/doc/app.docptviewer';
import { getPTOptions } from '@/components/doc/helpers/doc.helper';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'inputicon-pt-viewer',
    standalone: true,
    imports: [CommonModule, FormsModule, AppDocPtViewer, InputIconModule, IconFieldModule, InputTextModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input type="text" pInputText placeholder="Search" />
            </p-iconfield>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [{ data: getPTOptions('InputIcon'), key: 'InputIcon' }];
}
