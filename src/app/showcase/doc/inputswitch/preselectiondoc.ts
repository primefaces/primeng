import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'preselection-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Enabling <i>ngModel</i> property displays the component as active initially.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
        </div>
        <app-code [code]="code" selector="input-switch-preselection-demo"></app-code>
    </section>`
})
export class PreselectionDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean = true;

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
    selector: 'input-switch-preselection-demo',
    templateUrl: './input-switch-preselection-demo.html'
})
export class InputSwitchPreselectionDemo {
    checked: boolean = true;
}`
    };
}
