import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'download-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>PrimeNG is available for download at <a href="https://www.npmjs.com/package/primeng">npm</a>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class DownloadDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
// with npm
npm install primeng primeicons

// with yarn
yarn add primeng primeicons
`
    };
}
