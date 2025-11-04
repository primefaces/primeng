import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'inputtext-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, InputTextModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <input pInputText [(ngModel)]="value" placeholder="Username" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string | null = null;

    docs = [
        {
            data: getPTOptions('InputText'),
            key: 'InputText'
        }
    ];
}
