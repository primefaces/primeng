import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-template-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content inside a button is defined as children.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button [outlined]="true">
                <img alt="logo" src="https://primefaces.org/cdn/primeng/images/primeng-icon.svg" style="width: 1.5rem" />
                <span class="ml-2 font-bold">PrimeNG</span>
            </p-button>
        </div>
        <app-code [code]="code" selector="button-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `
<p-button [outlined]="true">
    <img alt="logo" src="https://primefaces.org/cdn/primeng/images/primeng-icon.svg" style="width: 1.5rem" />
    <span class="ml-2 font-bold">PrimeNG</span>
</p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-button [outlined]="true">
        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/primeng-icon.svg" style="width: 1.5rem" />
        <span class="ml-2 font-bold">PrimeNG</span>
    </p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-template-demo',
    templateUrl: './button-template-demo.html'
})
export class ButtonTemplateDemo { }`
    };
}
