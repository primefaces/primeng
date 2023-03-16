import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtext-basic-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>InputText is applied to an input field with pInputText directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input type="text" pInputText [(ngModel)]="value" />
        </div>
        <app-code [code]="code" selector="inputtext-basic-demo"></app-code>
    </div>`
})
export class BasicDoc {
    value: string;

    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<input type="text" pInputText [(ngModel)]="value" />`,

        html: `
<div class="card flex justify-content-center">
    <input type="text" pInputText [(ngModel)]="value" />
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtext-basic-demo',
    templateUrl: './inputtext-basic-demo.html',
    styleUrls: ['./inputtext-basic-demo.scss']
})
export class InputtextBasicDemo {
    value: string;
}`
    };
}
