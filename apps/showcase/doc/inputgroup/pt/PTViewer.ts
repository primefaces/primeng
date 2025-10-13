import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'inputgroup-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, InputGroupModule, InputGroupAddonModule, InputNumberModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-inputgroup>
                <p-inputgroup-addon>$</p-inputgroup-addon>
                <p-inputnumber [(ngModel)]="value" placeholder="Price" />
                <p-inputgroup-addon>.00</p-inputgroup-addon>
            </p-inputgroup>
        </app-docptviewer>
    `
})
export class PTViewer {
    value: number | null = null;

    docs = [
        {
            data: getPTOptions('InputGroup'),
            key: 'InputGroup'
        },
        {
            data: getPTOptions('InputGroupAddon'),
            key: 'InputGroupAddon'
        }
    ];
}
