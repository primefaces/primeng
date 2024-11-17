import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Buttons can also placed vertically by setting <i>buttonLayout</i> as <i>vertical</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputnumber [(ngModel)]="value1" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical" [inputStyle]="{ width: '3rem' }">
                <ng-template pTemplate="incrementbuttonicon">
                    <span class="pi pi-plus"></span>
                </ng-template>
                <ng-template pTemplate="decrementbuttonicon">
                    <span class="pi pi-minus"></span>
                </ng-template>
            </p-inputnumber>
        </div>
        <app-code [code]="code" selector="input-number-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    value1: number = 50;

    code: Code = {
        basic: `<p-inputnumber [(ngModel)]="value1" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical" [inputStyle]="{ width: '3rem' }">
    <ng-template pTemplate="incrementbuttonicon">
        <span class="pi pi-plus"></span>
    </ng-template>
    <ng-template pTemplate="decrementbuttonicon">
        <span class="pi pi-minus"></span>
    </ng-template>
</p-inputnumber>`,

        html: `<div class="card flex justify-center">
    <p-inputnumber [(ngModel)]="value1" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical" [inputStyle]="{ width: '3rem' }">
        <ng-template pTemplate="incrementbuttonicon">
            <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template pTemplate="decrementbuttonicon">
            <span class="pi pi-minus"></span>
        </ng-template>
    </p-inputnumber>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-number-vertical-demo',
    templateUrl: './input-number-vertical-demo.html',
    standalone: true,
    imports: [FormsModule, InputNumber]
})
export class InputNumberVerticalDemo {
    value1: number = 50;
}`
    };
}
