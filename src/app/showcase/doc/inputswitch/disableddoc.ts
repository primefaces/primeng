import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputswitch-disabled-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked" [disabled]="true"></p-inputSwitch>
        </div>
        <app-code [code]="code" selector="inputswitch-disabled-demo"></app-code>
    </div>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    checked: boolean;

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
    selector: 'inputswitch-disabled-demo',
    templateUrl: './inputswitch-disabled-demo.html',
    styleUrls: ['./inputswitch-disabled-demo.scss']
})

export class InputswitchDisabledDemo {
    checked: boolean;
}`
    };
}
