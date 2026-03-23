import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'fluid-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, FluidModule, InputTextModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-fluid>
                <input type="text" pInputText />
            </p-fluid>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Fluid'),
            key: 'Fluid'
        }
    ];
}
