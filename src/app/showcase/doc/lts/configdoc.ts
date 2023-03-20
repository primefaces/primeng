import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'config-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>In order to use an LTS release, primeng import path must reference the primeng-lts package.</p>
        </app-docsectiontext>

        <h3 class="mb-0">tsconfig.path</h3>
        <app-code [code]="code1" [hideToggleCode]="true"></app-code>

        <p>In addition, primeng.min.css needs to be loaded from the primeng-lts package.</p>
        <app-code [code]="code2" [hideToggleCode]="true"></app-code>
    </section>`
})
export class ConfigDoc {
    @Input() id: string;

    @Input() title: string;

    code1: Code = {
        typescript: `
{
    "compilerOptions": {
        //...other options
        "paths": {
            "primeng/*": ["node_modules/primeng-lts/*"]
        }
    }
}`
    };

    code2: Code = {
        basic: `
node_modules/primeng-lts/resources/primeng.min.css`
    };
}
