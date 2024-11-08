import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'download-doc',
    template: `
        <app-docsectiontext>
            <p>PrimeIcons is available at npm, run the following command to download it to your project.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class DownloadDoc {
    code: Code = {
        command: `npm install primeicons`
    };
}
