import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'download-doc',
    template: `
        <app-docsectiontext>
            <p>PrimeNG is available for download on the <a href="https://www.npmjs.com/package/primeng">npm</a> registry.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class DownloadDoc {
    code: Code = {
        command: `npm install primeng`
    };
}
