import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused entirely. Certain options can also be disabled using the <i>optionDisabled</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [disabled]="true"></p-selectButton>
            <p-selectButton [options]="stateOptions2" [(ngModel)]="value" optionLabel="label" optionValue="value" optionDisabled="constant"></p-selectButton>
        </div>
        <app-code [code]="code" selector="select-button-disabled-demo"></app-code>
    </section>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    stateOptions2: any[] = [
        { label: 'Option 1', value: 'off' },
        { label: 'Option 2', value: 'on', constant: true }
    ];

    value: string = 'off';

    code: Code = {
        basic: `
<p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [disabled]="true"></p-selectButton>
<p-selectButton [options]="stateOptions2" [(ngModel)]="value" optionLabel="label" optionValue="value" optionDisabled="constant"></p-selectButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" [disabled]="true"></p-selectButton>
    <p-selectButton [options]="stateOptions2" [(ngModel)]="value" optionLabel="label" optionValue="value" optionDisabled="constant"></p-selectButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'select-button-disabled-demo',
    templateUrl: './select-button-disabled-demo.html'
})
export class SelectButtonDisabledDemo {
    stateOptions: any[] = [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' }
    ];

    stateOptions2: any[] = [
        { label: 'Option 1', value: 'off' },
        { label: 'Option 2', value: 'on', constant:true }
    ];

    value: string = 'off';
}`
    };
}
