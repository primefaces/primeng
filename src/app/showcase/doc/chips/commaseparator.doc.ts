import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chips-comma-separator-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A new chip is added when <i>enter</i> key is pressed, <i>separator</i> property allows definining an additional key. Currently only valid value is <i>,</i> to create a new item when comma key is pressed.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" separator="," placeholder="Hint: a, b, c"></p-chips>
        </div>
        <app-code [code]="code" selector="chips-comma-separator-demo"></app-code>
    </section>`
})
export class CommaSeparatorDoc {
    @Input() id: string;

    @Input() title: string;

    values: string[] | undefined;

    code: Code = {
        basic: `
<p-chips [(ngModel)]="values" separator="," placeholder="Hint: a, b, c"></p-chips>`,

        html: `
<div class="card p-fluid">
    <p-chips [(ngModel)]="values" separator="," placeholder="Hint: a, b, c"></p-chips>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chips-comma-separator-demo',
    templateUrl: './chips-comma-separator-demo.html',
})
export class ChipsCommaSeparatorDemo {
    values: string[] | undefined;
}`
    };
}
