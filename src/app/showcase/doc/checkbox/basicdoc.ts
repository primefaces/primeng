import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'checkbox-basic-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Binary checkbox is used as a controlled input with <i>ngModel</i> and <i>binary</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary"></p-checkbox>
        </div>
        <app-code [code]="code" selector="checkbox-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean = false;

    code: Code = {
        basic: `
<p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary"></p-checkbox>`,

        html: `
<div class="card flex justify-content-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary"></p-checkbox>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-basic-demo',
    templateUrl: './checkbox-basic-demo.html'
})
export class CheckboxBasicDemo {
    checked: boolean = false;
}`
    };
}
