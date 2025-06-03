import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Invalid state is displayed using the <i>invalid</i> prop to indicate a failed validation. You can use this style when integrating with form validation libraries.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [invalid]="value === undefined" />
        </div>
        <app-code [code]="code" selector="select-button-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

    value: string | undefined;

    code: Code = {
        basic: `<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [invalid]="value === null" />`,

        html: `<div class="card flex justify-center">
    <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [invalid]="value === null" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-invalid-demo',
    templateUrl: './select-button-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonInvalidDemo {
    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

    value: string | undefined;
}`
    };
}
