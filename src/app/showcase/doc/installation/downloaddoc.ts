import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'download-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>PrimeNG is available for download at <a href="https://www.npmjs.com/package/primeng">npm</a>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class DownloadDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        command: `npm install primeng`
    };
}
