import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" class="ng-invalid ng-dirty"></p-selectButton>
        </div>
        <app-code [code]="code" selector="select-button-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    value: string = 'off';

    code: Code = {
        basic: `<p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" class="ng-invalid ng-dirty"></p-selectButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" class="ng-invalid ng-dirty"></p-selectButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'select-button-invalid-demo',
    templateUrl: './select-button-invalid-demo.html'
})
export class SelectButtonInvalidDemo {
    stateOptions: any[] = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];

    value: string = 'off';
}`
    };
}
