import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'primeflex-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>DataView depends on PrimeFlex Grid functionality so it needs to be installed and imported.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class PrimeflexDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `
npm install primeflex`
    };
}
