import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtext-disabled-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input id="disabled-input" type="text" pInputText [disabled]="true" [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="inputtext-disabled-demo"></app-code>
    </div>`
})
export class DisabledDoc {
    value: string;

    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<input id="disabled-input" type="text" pInputText [disabled]="true" [(ngModel)]="value" />`,

        html: `
<div class="card flex justify-content-center">
    <input id="disabled-input" type="text" pInputText [disabled]="true" [(ngModel)]="value" />
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtext-disabled-demo',
    templateUrl: './inputtext-disabled-demo.html',
    styleUrls: ['./inputtext-disabled-demo.scss']
})

export class InputtextDisabledDemo {
    value: string;
}`
    };
}
