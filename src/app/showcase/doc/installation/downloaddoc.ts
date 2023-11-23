import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'download-doc',
    template: ` 
        <app-docsectiontext>
            <p>PrimeNG is available for download at <a href="https://www.npmjs.com/package/primeng">npm</a>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class DownloadDoc {

    code: Code = {
        command: `npm install primeng`
    };

}
