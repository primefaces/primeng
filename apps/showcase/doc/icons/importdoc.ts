import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'import-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule],
    template: `
        <app-docsectiontext>
            <p>CSS file of the icon library needs to be imported in <i>styles.scss</i> of your application.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ImportDoc {
    code: Code = {
        scss: `@import "primeicons/primeicons.css";`
    };
}
