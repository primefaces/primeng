import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A model can be bound using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3 align-items-center">
            <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox"></p-triStateCheckbox>
            <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    value: boolean | null = null;

    code: Code = {
        basic: `
<p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox"></p-triStateCheckbox>`,

        html: `
<div class="card flex flex-column gap-3 align-items-center">
    <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox"></p-triStateCheckbox>
    <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tri-state-checkbox-basic-demo',
    templateUrl: './tri-state-checkbox-basic-demo.html'
})
export class TriStateCheckboxBasicDemo {
    value: boolean | null = null;
}`
    };
}
