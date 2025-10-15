import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dynamicdialog-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <p>For more information visit <a routerLink="dialog">Dialog PT</a>.</p>
        </app-docsectiontext>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Dialog'),
            key: 'Dialog'
        }
    ];
}
