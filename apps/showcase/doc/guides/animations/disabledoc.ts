import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
@Component({
    selector: 'disable-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Individual animations can be reduced and even disabled completely using the animation duration.</p>
        </app-docsectiontext>
        <app-code hideToggleCode hideStackBlitz></app-code>
    `
})
export class DisableDoc {}
