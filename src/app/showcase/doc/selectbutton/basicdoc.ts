import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>SelectButton requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" />
        </div>
        <app-code [code]="code" selector="select-button-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    stateOptions: any[] = [
        { label: 'One-Way', value: 'one-way' },
        { label: 'Return', value: 'return' },
    ];

    value: string = 'one-way';

    code: Code = {
        basic: `<p-selectButton 
    [options]="stateOptions" 
    [(ngModel)]="value" 
    optionLabel="label" 
    optionValue="value" />`,

        html: `<div class="card flex justify-center">
    <p-selectButton 
        [options]="stateOptions" 
        [(ngModel)]="value" 
        optionLabel="label" 
        optionValue="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-basic-demo',
    templateUrl: './select-button-basic-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButtonModule]
})
export class SelectButtonBasicDemo {
    stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];

    value: string = 'off';
}`,
    };
}
