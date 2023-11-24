import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` 
        <app-docsectiontext>
            <p>SelectButton requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value"></p-selectButton>
        </div>
        <app-code [code]="code" selector="select-button-basic-demo"></app-code>
  `
})
export class BasicDoc {

    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    value: string = 'off';

    code: Code = {
        basic: `
<p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value"></p-selectButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value"></p-selectButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'select-button-basic-demo',
    templateUrl: './select-button-basic-demo.html'
})
export class SelectButtonBasicDemo {
    stateOptions: any[] = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];

    value: string = 'off';
}`
    };
}
