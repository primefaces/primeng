import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, CheckboxModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-checkbox [(ngModel)]="checked" [binary]="true" />
        </app-docptviewer>
    `
})
export class PTViewer {
    checked: boolean = false;

    docs = [
        {
            data: getPTOptions('Checkbox'),
            key: 'Checkbox'
        }
    ];
}
