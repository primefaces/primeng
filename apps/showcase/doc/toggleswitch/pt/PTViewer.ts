import { CommonModule } from '@angular/common';
import { AppDocPtViewer } from '@/components/doc/app.docptviewer';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'toggleswitch-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, ToggleSwitchModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-toggleswitch [(ngModel)]="checked"></p-toggleswitch>
        </app-docptviewer>
    `
})
export class PTViewer {
    checked: boolean = false;

    docs = [{ data: getPTOptions('ToggleSwitch'), key: 'ToggleSwitch' }];
}
