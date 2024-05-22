import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'key-filter-doc',
    template: `
        <app-docsectiontext>
            <p>InputText has built-in key filtering support to block certain keys, refer to <a href="/keyfilter">keyfilter</a> page for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input pInputText pKeyFilter="int" placeholder="Integers" [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="inputtext-key-filter-demo"></app-code>
    `
})
export class KeyFilterDoc {
    value: number | undefined;

    code: Code = {
        basic: `<input pInputText pKeyFilter="int" placeholder="Integers" [(ngModel)]="value" />`,

        html: `
<div class="card flex justify-content-center">
    <input pInputText pKeyFilter="int" placeholder="Integers" [(ngModel)]="value" />
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-text-key-filter-demo',
    templateUrl: './input-text-key-filter-demo.html'
})
export class InputTextKeyFilterDemo {
    value: number | undefined;
}`
    };
}
