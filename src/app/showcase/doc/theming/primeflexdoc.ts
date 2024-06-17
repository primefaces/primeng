import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'primeflex-doc',
    template: `
        <app-docsectiontext>
            <p>
                <a href="https://primeflex.org/">PrimeFlex</a> is a lightweight responsive CSS utility library to accompany Prime UI libraries and static webpages as well. PrimeNG can be used with any CSS utility library like bootstrap and tailwind
                however PrimeFlex has benefits like integration with PrimeNG themes using CSS variables so that colors classes e.g. <i>bg-blue-500</i> receive the color code from the PrimeNG theme being used. PrimeNG follows the CSS utility approach
                of PrimeFlex and currently does not provide an extended style property like <i>sx</i>. Same approach is also utilized in <a href="https://blocks.primeng.org">PrimeBlocks for PrimeNG</a> project as well.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row md:justify-content-between row-gap-3">
            <p-button label="Button 1"></p-button>
            <p-button styleClass="p-button-secondary" label="Button 2"></p-button>
            <p-button styleClass="p-button-help" label="Button 3"></p-button>
        </div>
        <app-code [code]="code1" [hideToggleCode]="true"></app-code>
    `
})
export class PrimeFlexDoc {
    code1: Code = {
        basic: `<div class="card flex flex-column md:flex-row md:justify-content-between row-gap-3">
    <p-button label="Button 1"></p-button>
    <p-button styleClass="p-button-secondary" label="Button 2"></p-button>
    <p-button styleClass="p-button-help" label="Button 3"></p-button>
</div>`
    };
}
