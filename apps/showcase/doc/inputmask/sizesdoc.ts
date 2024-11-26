import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>InputMask provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-inputmask [(ngModel)]="value1" placeholder="Small" size="small" mask="99-999999" />
            <p-inputmask [(ngModel)]="value2" placeholder="Normal" mask="99-999999" />
            <p-inputmask [(ngModel)]="value3" placeholder="Large" size="large" mask="99-999999" />
        </div>
        <app-code [code]="code" selector="input-mask-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<p-inputmask [(ngModel)]="value1" placeholder="Small" size="small" mask="99-999999" />
<p-inputmask [(ngModel)]="value2" placeholder="Normal" mask="99-999999" />
<p-inputmask [(ngModel)]="value3" placeholder="Large" size="large" mask="99-999999" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-inputmask [(ngModel)]="value1" placeholder="Small" size="small" mask="99-999999" />
    <p-inputmask [(ngModel)]="value2" placeholder="Normal" mask="99-999999" />
    <p-inputmask [(ngModel)]="value3" placeholder="Large" size="large" mask="99-999999" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-sizes-demo',
    templateUrl: './input-mask-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskSizesDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
