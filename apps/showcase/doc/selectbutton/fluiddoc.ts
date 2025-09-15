import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, SelectButtonModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" fluid />
        </div>
        <app-code [code]="code" selector="select-button-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

    value: string = 'one-way';

    code: Code = {
        basic: `<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" fluid />`,

        html: `<div class="card">
    <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-fluid-demo',
    templateUrl: './select-button-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonFluidDemo {
    stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];

    value: string = 'off';
}`
    };
}
