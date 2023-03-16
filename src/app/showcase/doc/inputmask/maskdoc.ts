import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputmask-mask-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Mask format can be a combination of the following definitions; <i>a</i> for alphabetic characters, <i>9</i> for numeric characters and <i>*</i> for alphanumberic characters. In addition, formatting characters like <i>(</i> ,
                <i>)</i> , <i>-</i> are also accepted.
            </p>
        </app-docsectiontext>
        <div class="card p-fluid flex flex-wrap gap-3">
            <div class="flex-auto">
                <span class="font-bold block mb-2">SSN</span>
                <p-inputMask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999"></p-inputMask>
            </div>
            <div class="flex-auto">
                <span class="font-bold block mb-2">Phone</span>
                <p-inputMask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999"></p-inputMask>
            </div>
            <div class="flex-auto">
                <span class="font-bold block mb-2">Serial Number</span>
                <p-inputMask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999"></p-inputMask>
            </div>
        </div>
        <app-code [code]="code" selector="inputmask-mask-demo"></app-code>
    </div>`
})
export class MaskDoc {
    @Input() id: string;

    @Input() title: string;

    value1: string;

    value2: string;

    value3: string;

    code: Code = {
        basic: `
<span class="font-bold block mb-2">SSN</span>
<p-inputMask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999"></p-inputMask>

<span class="font-bold block mb-2">Phone</span>
<p-inputMask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999"></p-inputMask>

<span class="font-bold block mb-2">Serial Number</span>
<p-inputMask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999"></p-inputMask>`,

        html: `
<div class="card p-fluid flex flex-wrap gap-3">
    <div class="flex-auto">
        <span class="font-bold block mb-2">SSN</span>
        <p-inputMask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999"></p-inputMask>
    </div>

    <div class="flex-auto">
        <span class="font-bold block mb-2">Phone</span>
        <p-inputMask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999"></p-inputMask>
    </div>

    <div class="flex-auto">
        <span class="font-bold block mb-2">Serial Number</span>
        <p-inputMask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999"></p-inputMask>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputmask-mask-demo',
    templateUrl: './inputmask-mask-demo.html',
    styleUrls: ['./inputmask-mask-demo.scss']
})
export class InputmaskMaskDemo {
    value1: string;

    value2: string;

    value3: string;
}`
    };
}
