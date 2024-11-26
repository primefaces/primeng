import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'buttons-doc',
    template: `
        <app-docsectiontext>
            <p>
                Spinner buttons are enabled using the <i>showButtons</i> options and layout is defined with the <i>buttonLayout</i>. Default value is "stacked" whereas "horizontal" and "stacked" are alternatives. Note that even there are no buttons,
                up and down arrow keys can be used to spin the values with keyboard.
            </p>
        </app-docsectiontext>
        <p-fluid class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label class="mb-2 block font-bold" for="stacked">Stacked</label>
                <p-inputnumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 block font-bold" for="minmax-buttons">Min-Max Boundaries</label>
                <p-inputnumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100" />
            </div>
            <div class="flex-auto">
                <label class="mb-2 block font-bold" for="horizontal">Horizontal with Step</label>
                <p-inputnumber [(ngModel)]="value3" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25" mode="currency" currency="EUR">
                    <ng-template pTemplate="incrementbuttonicon">
                        <span class="pi pi-plus"></span>
                    </ng-template>
                    <ng-template pTemplate="decrementbuttonicon">
                        <span class="pi pi-minus"></span>
                    </ng-template>
                </p-inputnumber>
            </div>
        </p-fluid>
        <app-code [code]="code" selector="input-number-buttons-demo"></app-code>
    `
})
export class ButtonsDoc {
    value1: number = 20;

    value2: number = 10.5;

    value3: number = 25;

    code: Code = {
        basic: `<p-inputnumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD" />
<p-inputnumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100" />
<p-inputnumber [(ngModel)]="value3" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25" mode="currency" currency="EUR">
    <ng-template pTemplate="incrementbuttonicon">
        <span class="pi pi-plus"></span>
    </ng-template>
    <ng-template pTemplate="decrementbuttonicon">
        <span class="pi pi-minus"></span>
    </ng-template>
</p-inputnumber>`,

        html: `<p-fluid class="card flex flex-wrap gap-4">
    <div class="flex-auto">
        <label class="mb-2 block font-bold" for="stacked">
            Stacked
        </label>
        <p-inputnumber [(ngModel)]="value1" [showButtons]="true" inputId="stacked" mode="currency" currency="USD" />
    </div>
    <div class="flex-auto">
        <label class="mb-2 block font-bold" for="minmax-buttons">
            Min-Max Boundaries
        </label>
        <p-inputnumber [(ngModel)]="value2" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100" />
    </div>
    <div class="flex-auto">
        <label class="mb-2 block font-bold" for="horizontal">
            Horizontal with Step
        </label>
    <p-inputnumber [(ngModel)]="value3" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25" mode="currency" currency="EUR">
        <ng-template pTemplate="incrementbuttonicon">
            <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template pTemplate="decrementbuttonicon">
            <span class="pi pi-minus"></span>
        </ng-template>
    </p-inputnumber>
    </div>
</p-fluid>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'input-number-buttons-demo',
    templateUrl: './input-number-buttons-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber, Fluid]
})
export class InputNumberButtonsDemo {
    value1: number = 20;

    value2: number = 10.5;

    value3: number = 25;
}`
    };
}
