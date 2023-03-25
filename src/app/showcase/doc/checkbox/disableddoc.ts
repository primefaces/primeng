import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'checkbox-disabled-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-checkbox [disabled]="true" [(ngModel)]="checked"></p-checkbox>
        </div>
        <app-code [code]="code" selector="checkbox-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean;

    code: Code = {
        basic: `
<p-checkbox [disabled]="true" [(ngModel)]="checked"></p-checkbox>`,

        html: `
<div class="card flex justify-content-center">
    <p-checkbox [disabled]="true" [(ngModel)]="checked"></p-checkbox>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-disabled-demo',
    templateUrl: './checkbox-disabled-demo.html'
})
export class CheckboxDisabledDemo {
    checked: boolean;
}`
    };
}
