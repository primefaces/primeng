import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, SelectButtonModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>SelectButton requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />
        </div>
        <app-code [code]="code" selector="select-button-basic-demo"></app-code>
    `
})
export class BasicDoc {
    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' }
    ];

    value: string = 'one-way';

    code: Code = {
        basic: `<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />`,

        html: `<div class="card flex justify-center">
    <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-basic-demo',
    templateUrl: './select-button-basic-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonBasicDemo {
    stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];

    value: string = 'off';
}`
    };
}
