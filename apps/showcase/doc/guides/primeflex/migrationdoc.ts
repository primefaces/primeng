import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'migration-doc',
    template: `
        <app-docsectiontext>
            <p>
                The <a href="https://www.npmjs.com/package/primeclt" target="_blank" rel="noopener noreferrer">primeclt</a> is a command line utility by PrimeTek to assist project setup and migration. The <i>pf2tw</i> command is created for smooth
                migration between PrimeFlex to Tailwind CSS. For flawless migration, it is highly suggested to use PrimeNG v18 as the requirement of the tailwindcss plugin.
            </p>
            <p>Install PrimeCLT.</p>
            <app-code [code]="code1" selector="demo1" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
            <p class="mt-4">Run the <i>pf2wt</i> in a directory that contains files to be migrated.</p>
            <app-code [code]="code2" selector="demo2" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
            <p class="mt-4">There are a couple of utility classes that are not migrated as they have no counterparts, use flexbox utilities instead as replacements.</p>
            <ul class="leading-loose">
                <li>formgrid</li>
                <li>formgroup</li>
                <li>formgroup-inline</li>
                <li>col</li>
                <li>col-fixed</li>
                <li>field</li>
                <li>field-checkbox</li>
                <li>field-radiobutton</li>
                <li>reset</li>
            </ul>
        </app-docsectiontext>
    `
})
export class MigrationDoc {
    code1: Code = {
        basic: `npm install -g primeclt`
    };
    code2: Code = {
        basic: `prime pf2tw`
    };
}
