import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputswitch-preselection-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Enabling <i>ngModel</i> property displays the component as active initially.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked"></p-inputSwitch>
        </div>
        <app-code [code]="code" selector="inputswitch-preselection-demo"></app-code>
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
    selector: 'inputswitch-preselection-demo',
    templateUrl: './inputswitch-preselection-demo.html',
    styleUrls: ['./inputswitch-preselection-demo.scss']
})
export class InputswitchPreselectionDemo {
    checked: boolean = true;
}`
    };
}
