import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'primeflex-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                <a href="https://www.primefaces.org/primeflex/">PrimeFlex</a> is a lightweight responsive CSS utility library to accompany Prime UI libraries and static webpages as well. PrimeNG can be used with any CSS utility library like bootstrap
                and tailwind however PrimeFlex has benefits like integration with PrimeNG themes usign CSS variables so that colors classes e.g. <i>bg-blue-500</i> receive the color code from the PrimeNG theme being used. PrimeNG follows the CSS
                utility approach of PrimeFlex and currently does not provide an extended style property like <i>sx</i>. Same approach is also utilized in <a href="https://blocks.primeng.org">PrimeBlocks for PrimeNG</a> project as well.
            </p>
        </app-docsectiontext>
        <div class="flex flex-column md:flex-row justify-content-between my-5">
            <p-button styleClass="mb-3 md:mb-0" label="button 1"></p-button>
            <p-button styleClass="p-button-secondary mb-3 md:mb-0" label="button 2"></p-button>
            <p-button styleClass="p-button-help" label="button 3"></p-button>
        </div>
        <app-code [code]="code1" [hideToggleCode]="true"></app-code>
    </div>`
})
export class PrimeFlexDoc {
    @Input() id: string;

    @Input() title: string;

    code1: Code = {
        basic: `
<div class="flex flex-column md:flex-row justify-content-between my-5">
    <p-button styleClass="mb-3 md:mb-0" label="button 1"></p-button>
    <p-button styleClass="p-button-secondary mb-3 md:mb-0" label="button 2"></p-button>
    <p-button styleClass="p-button-help" label="button 3"></p-button>
</div>`
    };
}
