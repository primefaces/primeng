import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'input-mask-mask-demo',
    template: ` <section class="py-4">
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
        <app-code [code]="code" selector="input-mask-mask-demo"></app-code>
    </section>`
})
export class MaskDoc {
    @Input() id: string;

    @Input() title: string;

    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

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
    selector: 'input-mask-mask-demo',
    templateUrl: './input-mask-mask-demo.html'
})
export class InputMaskMaskDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
