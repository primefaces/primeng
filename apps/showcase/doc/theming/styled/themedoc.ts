import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'theme-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>theme</i> property is used to customize the initial theme.</p>
        </app-docsectiontext>
        <app-code selector="theme-demo" [hideToggleCode]="true"></app-code>
    `
})
export class ThemeDoc {}
