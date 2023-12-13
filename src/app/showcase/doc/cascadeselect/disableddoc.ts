import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'cascade-select-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-cascadeSelect [disabled]="true" placeholder="Disabled" [style]="{ minWidth: '14rem' }"></p-cascadeSelect>
        </div>
        <app-code [code]="code" selector="cascade-select-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    code: Code = {
        basic: `<p-cascadeSelect [disabled]="true" placeholder="Disabled" [style]="{ minWidth: '14rem' }"></p-cascadeSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-cascadeSelect [disabled]="true" placeholder="Disabled" [style]="{ minWidth: '14rem' }"></p-cascadeSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'cascade-select-disabled-demo',
    templateUrl: './cascade-select-disabled-demo.html'
})
export class CascadeSelectDisabledDemo {
   
}`
    };
}
