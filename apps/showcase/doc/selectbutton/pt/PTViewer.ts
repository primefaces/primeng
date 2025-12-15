import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'selectbutton-pt-viewer',
    standalone: true,
    imports: [CommonModule, FormsModule, AppDocPtViewer, SelectButtonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-selectbutton [(ngModel)]="value" [options]="options" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string = 'One-Way';

    options: string[] = ['One-Way', 'Return'];

    docs = [
        {
            data: getPTOptions('SelectButton'),
            key: 'SelectButton'
        }
    ];
}
