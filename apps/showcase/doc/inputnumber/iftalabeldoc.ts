import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'ifta-label-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" />
                <label for="price_input">Price</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="input-number-ifta-label-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: number | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" />
    <label for="price_input">Price</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <p-inputnumber [(ngModel)]="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" />
        <label for="price_input">Price</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'input-number-ifta-label-demo',
    templateUrl: './input-number-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule, IftaLabelModule]
})
export class InputNumberIftaLabelDemo {
    value: number | undefined;
}`
    };
}
