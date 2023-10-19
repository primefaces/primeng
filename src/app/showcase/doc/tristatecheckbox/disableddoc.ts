import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3 align-items-center">
            <p-triStateCheckbox [(ngModel)]="value" [disabled]="true"></p-triStateCheckbox>
            <label>{{ value === null ? 'null' : value }}</label>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    value!: string;

    code: Code = {
        basic: `
<p-triStateCheckbox [(ngModel)]="value" [disabled]="true"></p-triStateCheckbox>`,

        html: `
<div class="card flex flex-column gap-3 align-items-center">
    <p-triStateCheckbox [(ngModel)]="value" [disabled]="true"></p-triStateCheckbox>
    <label>{{value === null ? 'null' : value}}</label>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tri-state-checkbox-disabled-demo',
    templateUrl: './tri-state-checkbox-disabled-demo.html'
})
export class TriStateCheckboxDisabledDemo {
    value!: string;
}`
    };
}
