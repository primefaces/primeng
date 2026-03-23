import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'inputmask-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, InputMaskModule, InputText, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <input pInputText [(ngModel)]="value" pInputMask="99-999999" placeholder="99-999999" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string | null = null;

    docs = [
        {
            data: getPTOptions('InputMask'),
            key: 'InputMask'
        }
    ];
}
