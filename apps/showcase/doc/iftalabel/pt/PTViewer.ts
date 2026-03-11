import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'iftalabel-pt-viewer',
    standalone: true,
    imports: [CommonModule, FormsModule, AppDocPtViewer, IftaLabelModule, InputTextModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-iftalabel>
                <input type="text" pInputText [(ngModel)]="value" />
                <label>Username</label>
            </p-iftalabel>
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string = '';
    docs = [{ data: getPTOptions('IftaLabel'), key: 'IftaLabel' }];
}
