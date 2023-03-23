import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'download-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p class="mb-0">
                PrimeNG-LTS is available at <a href="https://www.npmjs.com/package/primeng-lts">npm</a>, if you have an existing application run the following command to download it to your project. If you require a specific version, refer to the
                <a href="https://www.npmjs.com/package/primeng-lts">versions list</a> for the version compatible with your project.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class DownloadDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
npm install primeng-lts --save`
    };
}
