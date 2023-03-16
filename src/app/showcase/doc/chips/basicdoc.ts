import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chips-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Chips requires an array as its model.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values"></p-chips>
        </div>
        <app-code [code]="code" selector="chips-basic-demo"></app-code>
    </div>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    values: string[];

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
    templateUrl: './chips-basic-demo.html',
    styleUrls: ['./chips-basic-demo.scss']
})

export class ChipsBasicDemo {
    values: string[];
}`
    };
}
