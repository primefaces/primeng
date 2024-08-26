import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Buttons can also placed vertically by setting <i>buttonLayout</i> as <i>vertical</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputNumber
                [(ngModel)]="value1"
                [showButtons]="true"
                buttonLayout="vertical"
                spinnerMode="vertical"
                inputId="vertical"
                [style]="{ width: '3rem' }"
                decrementButtonClass="p-button-secondary"
                incrementButtonClass="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
            />
        </div>
        <app-code [code]="code" selector="input-number-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    value1: number = 50;

    code: Code = {
        basic: `<p-inputNumber 
    [(ngModel)]="value1" 
    [showButtons]="true" 
    buttonLayout="vertical" 
    spinnerMode="vertical" 
    inputId="vertical"
    decrementButtonClass="p-button-secondary"
    incrementButtonClass="p-button-secondary" 
    incrementButtonIcon="pi pi-plus" 
    decrementButtonIcon="pi pi-minus" />`,

        html: `<div class="card flex justify-center">
    <p-inputNumber 
        [(ngModel)]="value1" 
        [style]="{'width': '4rem'}" 
        [showButtons]="true" 
        buttonLayout="vertical"
        spinnerMode="vertical" 
        inputId="vertical" 
        decrementButtonClass="p-button-secondary"
        incrementButtonClass="p-button-secondary" 
        incrementButtonIcon="pi pi-plus" 
        decrementButtonIcon="pi pi-minus" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-vertical-demo',
    templateUrl: './input-number-vertical-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumberModule]
})
export class InputNumberVerticalDemo {
    value1: number = 50;
}`
    };
}
