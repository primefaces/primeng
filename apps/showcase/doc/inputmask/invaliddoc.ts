import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <p-inputmask [(ngModel)]="value1" mask="99-999999" placeholder="Serial Key" [invalid]="!value1" />
            <p-inputmask [(ngModel)]="value2" mask="99-999999" placeholder="Serial Key" [invalid]="!value2" variant="filled" />
        </div>

        <app-code [code]="code" selector="input-mask-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;

    code: Code = {
        basic: `<p-inputmask [(ngModel)]="value1" mask="99-999999" placeholder="Serial Key" [invalid]="!value1" />
<p-inputmask [(ngModel)]="value2" mask="99-999999" placeholder="Serial Key" [invalid]="!value2" variant="filled" />`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <p-inputmask [(ngModel)]="value1" mask="99-999999" placeholder="Serial Key" [invalid]="!value1" />
    <p-inputmask [(ngModel)]="value2" mask="99-999999" placeholder="Serial Key" [invalid]="!value2" variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-invalid-demo',
    templateUrl: './input-mask-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskInvalidDemo {
    value1: string | undefined;

    value2: string | undefined;
}`
    };
}
