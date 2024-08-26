import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused entirely. Certain options can also be disabled using the <i>optionDisabled</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center flex-wrap gap-4">
            <p-selectButton [options]="stateOptions" [(ngModel)]="value1" optionLabel="label" optionValue="value" [disabled]="true" />
            <p-selectButton [options]="stateOptions2" [(ngModel)]="value2" optionLabel="label" optionValue="value" optionDisabled="constant" />
        </div>
        <app-code [code]="code" selector="select-button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    stateOptions2: any[] = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2', constant: true }
    ];

    value1: string = 'off';

    value2: string = 'Option 1';

    code: Code = {
        basic: `<p-selectButton 
    [options]="stateOptions" 
    [(ngModel)]="value1" 
    optionLabel="label"
    optionValue="value" 
    [disabled]="true" />

<p-selectButton 
    [options]="stateOptions2" 
    [(ngModel)]="value2" 
    optionLabel="label" 
    optionValue="value" 
    optionDisabled="constant" />`,

        html: `<div class="card flex justify-center">
    <p-selectButton 
        [options]="stateOptions" 
        [(ngModel)]="value1" 
        optionLabel="label" 
        optionValue="value" 
        [disabled]="true" />
    <p-selectButton 
        [options]="stateOptions2" 
        [(ngModel)]="value2"
        optionLabel="label" 
        optionValue="value" 
        optionDisabled="constant" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-disabled-demo',
    templateUrl: './select-button-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButtonModule]
})
export class SelectButtonDisabledDemo {
    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    stateOptions2: any[] = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2', constant: true }
    ];

    value1: string = 'off';

    value2: string = 'Option 1';
}`
    };
}
