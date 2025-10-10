import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

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
