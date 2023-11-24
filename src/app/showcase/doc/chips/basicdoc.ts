import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chips-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Chips is used as a controlled input with <i>ngModel</i> property where it should be an array.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values"></p-chips>
        </div>
        <app-code [code]="code" selector="chips-basic-demo"></app-code>
    `
})
export class BasicDoc {
    values: string[] | undefined;

    code: Code = {
        basic: `
<p-chips [(ngModel)]="values"></p-chips>`,

        html: `
<div class="card p-fluid">
    <p-chips [(ngModel)]="values" ></p-chips>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chips-basic-demo',
    templateUrl: './chips-basic-demo.html'
})
export class ChipsBasicDemo {
    values: string[] | undefined;
}`
    };
}
