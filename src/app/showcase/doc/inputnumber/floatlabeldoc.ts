import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'float-label-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-floatLabel>
                <p-inputNumber inputId="integeronly" [(ngModel)]="value1" />
                <label for="number-input">Number</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="input-number-float-label-demo"></app-code>
    `
})
export class FloatlabelDoc {
    value1!: number;

    code: Code = {
        basic: `<p-floatLabel>
    <p-inputNumber inputId="integeronly" [(ngModel)]="value1" />
    <label for="number-input">Number</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-content-center">
    <p-floatLabel>
        <p-inputNumber inputId="integeronly" [(ngModel)]="value1" />
        <label for="number-input">Number</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'input-number-float-label-demo',
    templateUrl: './input-number-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule, FloatLabelModule]
})
export class InputNumberFloatLabelDemo {
    value1!: number;
}`
    };
}
