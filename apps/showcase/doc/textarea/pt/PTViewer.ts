import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'textarea-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, TextareaModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <textarea pTextarea [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string | null = null;

    docs = [
        {
            data: getPTOptions('Textarea'),
            key: 'Textarea'
        }
    ];
}
