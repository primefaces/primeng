import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'input-mask-mask-demo',
    template: `
        <app-docsectiontext>
            <p>
                Mask format can be a combination of the following definitions; <i>a</i> for alphabetic characters, <i>9</i> for numeric characters and <i>*</i> for alphanumberic characters. In addition, formatting characters like <i>(</i> ,
                <i>)</i> , <i>-</i> are also accepted.
            </p>
        </app-docsectiontext>
        <p-fluid class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <span class="font-bold block mb-2">SSN</span>
                <p-inputmask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999" />
            </div>
            <div class="flex-auto">
                <span class="font-bold block mb-2">Phone</span>
                <p-inputmask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999" />
            </div>
            <div class="flex-auto">
                <span class="font-bold block mb-2">Serial Number</span>
                <p-inputmask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999" />
            </div>
        </p-fluid>
        <app-code [code]="code" selector="input-mask-mask-demo"></app-code>
    `
})
export class MaskDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<span class="font-bold block mb-2">SSN</span>
<p-inputmask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999" />
<span class="font-bold block mb-2">Phone</span>
<p-inputmask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999" />
<span class="font-bold block mb-2">Serial Number</span>
<p-inputmask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999" />`,

        html: `<p-fluid class="card flex flex-wrap gap-4">
    <div class="flex-auto">
        <span class="font-bold block mb-2">SSN</span>
        <p-inputmask mask="999-99-9999" [(ngModel)]="value1" placeholder="999-99-9999" />
    </div>
    <div class="flex-auto">
        <span class="font-bold block mb-2">Phone</span>
        <p-inputmask mask="(999) 999-9999" [(ngModel)]="value2" placeholder="(999) 999-9999" />
    </div>
    <div class="flex-auto">
        <span class="font-bold block mb-2">Serial Number</span>
        <p-inputmask mask="a*-999-a999" [(ngModel)]="value3" placeholder="a*-999-a999" />
    </div>
</p-fluid>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-mask-mask-demo',
    templateUrl: './input-mask-mask-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask, Fluid]
})
export class InputMaskMaskDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
