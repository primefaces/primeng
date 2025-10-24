import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true" />
        </div>
        <app-code [code]="code" selector="input-mask-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true" />`,

        html: `<div class="card flex justify-center">
    <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" [showClear]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-clear-icon-demo',
    templateUrl: './input-mask-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask]
})
export class InputMaskClearIconDemo {
    value: string | undefined;
}`
    };
}
