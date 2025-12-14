import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'colorpicker-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ColorPickerModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-colorpicker [(ngModel)]="color" [inline]="true"></p-colorpicker>
        </app-docptviewer>
    `
})
export class PTViewer {
    color: string | undefined;

    docs = [{ data: getPTOptions('ColorPicker'), key: 'ColorPicker' }];
}
