import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'download-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>PrimeIcons is available at npm, run the following command to download it to your project.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class DownloadDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        command: `npm install primeicons`
    };
}
