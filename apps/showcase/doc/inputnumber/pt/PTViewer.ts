import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'inputnumber-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, InputNumberModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-inputnumber [(ngModel)]="value" inputId="stacked-buttons" [showButtons]="true" mode="currency" currency="USD" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value: number = 20;

    docs = [
        {
            data: getPTOptions('InputNumber'),
            key: 'InputNumber'
        }
    ];
}
