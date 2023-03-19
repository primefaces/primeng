import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chips-commaseperator-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A new chip is added when enter key is pressed, separator property allows definining an additional key. Currently only valid value is , to create a new item when comma key is pressed.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" separator="," placeholder="Hint: a, b, c"></p-chips>
        </div>
        <app-code [code]="code" selector="chips-commaseperator-demo"></app-code>
    </section>`
})
export class CommaSeperatorDoc {
    @Input() id: string;

    @Input() title: string;

    values: string[];

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
    selector: 'chips-commaseperator-demo',
    templateUrl: './chips-commaseperator-demo.html',
    styleUrls: ['./chips-commaseperator-demo.scss']
})

export class ChipsCommaseperatorDemo {
    values: string[];
}`
    };
}
