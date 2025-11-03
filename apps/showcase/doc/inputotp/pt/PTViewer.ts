import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
    selector: 'inputotp-pt-viewer',
    standalone: true,
    imports: [CommonModule, FormsModule, AppDocPtViewer, InputOtpModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-inputotp [(ngModel)]="value" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value: any;
    docs = [{ data: getPTOptions('InputOtp'), key: 'InputOtp' }];
}
