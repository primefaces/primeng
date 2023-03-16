import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputmask-slotchar-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Default placeholder for a mask is underscore that can be customized using <i>slotChar</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputMask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy"></p-inputMask>
        </div>
        <app-code [code]="code" selector="inputmask-slotchar-demo"></app-code>
    </div>`
})
export class SlotCharDoc {
    @Input() id: string;

    @Input() title: string;

    value: string;

    code: Code = {
        basic: `
<p-inputMask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy"></p-inputMask>`,

        html: `
<div class="card flex justify-content-center">
    <p-inputMask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy"></p-inputMask>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputmask-slotchar-demo',
    templateUrl: './inputmask-slotchar-demo.html',
    styleUrls: ['./inputmask-slotchar-demo.scss']
})
export class InputmaskSlotcharDemo {
    value: string;
}`
    };
}
