import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'buttons-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Spinner buttons is enabled using the <i>showButtons</i> options and layout is defined with the <i>buttonLayout</i>. Default value is "stacked" whereas "horizontal" and "stacked" are alternatives. Note that even there are no buttons,
                up and down arrow keys can be used to spin the values with keyboard.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="mb-2 block font-bold" for="stacked">Stacked</label>
                <p-inputNumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="mb-2 block font-bold" for="minmax-buttons">Min-Max Boundaries</label>
                <p-inputNumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100"> </p-inputNumber>
            </div>
            <div class="flex-auto">
                <label class="mb-2 block font-bold" for="horizontal">Horizontal with Step</label>
                <p-inputNumber
                    [(ngModel)]="value3"
                    [showButtons]="true"
                    buttonLayout="horizontal"
                    inputId="horizontal"
                    spinnerMode="horizontal"
                    [step]="0.25"
                    decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    mode="currency"
                    currency="EUR"
                ></p-inputNumber>
            </div>
        </div>
        <app-code [code]="code" selector="input-number-buttons-demo"></app-code>
    </section>`
})
export class ButtonsDoc {
    @Input() id: string;

    @Input() title: string;

    value1: number = 20;

    value2: number = 10.5;

    value3: number = 25;

    code: Code = {
        basic: `
<p-inputNumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100"> </p-inputNumber>
<p-inputNumber [(ngModel)]="value3" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25"
    decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="currency" currency="EUR"></p-inputNumber>`,

        html: `
<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label class="mb-2 block font-bold" for="stacked">Stacked</label>
        <p-inputNumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="mb-2 block font-bold" for="minmax-buttons">Min-Max Boundaries</label>
        <p-inputNumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100"> </p-inputNumber>
    </div>
    <div class="flex-auto">
        <label class="mb-2 block font-bold" for="horizontal">Horizontal with Step</label>
        <p-inputNumber
            [(ngModel)]="value3"
            [showButtons]="true"
            buttonLayout="horizontal"
            inputId="horizontal"
            spinnerMode="horizontal"
            [step]="0.25"
            decrementButtonClass="p-button-danger"
            incrementButtonClass="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            mode="currency"
            currency="EUR"
        ></p-inputNumber>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-number-buttons-demo',
    templateUrl: './input-number-buttons-demo.html'
})
export class InputNumberButtonsDemo {
    value1: number = 20;

    value2: number = 10.5;

    value3: number = 25;
}`
    };
}
