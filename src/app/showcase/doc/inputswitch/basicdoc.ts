import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputswitch-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
        </div>
        <app-code [code]="code" selector="inputswitch-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean;

    code: Code = {
        basic: `
<p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>`,

        html: ` 
<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputswitch-basic-demo',
    templateUrl: './inputswitch-basic-demo.html',
    styleUrls: ['./inputswitch-basic-demo.scss']
})
export class InputswitchBasicDemo {
    checked: boolean;
}`
    };
}
