import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'import-doc',
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
