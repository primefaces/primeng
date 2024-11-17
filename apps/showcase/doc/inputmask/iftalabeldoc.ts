import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'iftalabel-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-inputmask id="ssn" [(ngModel)]="value" mask="999-99-9999" autocomplete="off" />
                <label for="ssn">SSN</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="input-mask-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <p-inputmask id="ssn" [(ngModel)]="value" mask="999-99-9999" autocomplete="off" />
    <label for="ssn">SSN</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <p-inputmask id="ssn" [(ngModel)]="value" mask="999-99-9999" autocomplete="off" />
        <label for="ssn">SSN</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'input-mask-iftalabel-demo',
    templateUrl: './input-mask-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule, IftaLabelModule]
})
export class InputMaskIftaLabelDemo {
    value: string | undefined;
}`
    };
}
