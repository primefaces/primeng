import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'primeflex-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>DataView depends on PrimeFlex Grid functionality so it needs to be installed and imported.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class PrimeflexDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `npm install primeflex`
    };
}
