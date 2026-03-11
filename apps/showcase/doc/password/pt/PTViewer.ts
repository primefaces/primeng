import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'password-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, PasswordModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-password [(ngModel)]="value" [toggleMask]="true"></p-password>
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string | null = null;

    docs = [
        {
            data: getPTOptions('Password'),
            key: 'Password'
        }
    ];
}
