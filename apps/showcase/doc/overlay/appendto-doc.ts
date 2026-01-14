import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'appendto-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: ` <app-docsectiontext>
            <p>Overlay can be mounted into its location, body or DOM element instance using this option.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>`
})
export class AppendToDoc {}
