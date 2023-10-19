import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked" [disabled]="true"></p-inputSwitch>
        </div>
        <app-code [code]="code" selector="input-switch-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean = false;

    code: Code = {
        basic: `
<p-inputSwitch [(ngModel)]="checked" [disabled]="true"></p-inputSwitch>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked" [disabled]="true"></p-inputSwitch>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-switch-disabled-demo',
    templateUrl: './input-switch-disabled-demo.html'
})
export class InputSwitchDisabledDemo {
    checked: boolean = false;
}`
    };
}
