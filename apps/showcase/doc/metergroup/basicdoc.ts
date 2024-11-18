import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>MeterGroup requires a <i>value</i> as the data to display where each item in the collection should be a type of <i>MeterItem</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-metergroup [value]="value" />
        </div>
        <app-code [code]="code" selector="meter-group-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value = [{ label: 'Space used', value: 15, color: 'var(--p-primary-color)' }];

    code: Code = {
        basic: `<p-metergroup [value]="value" />`,

        html: `<div class="card">
    <p-metergroup [value]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MeterGroup } from 'primeng/metergroup';

@Component({
    selector: 'meter-group-basic-demo',
    templateUrl: './meter-group-basic-demo.html',
    standalone: true,
    imports: [MeterGroup]
})
export class MeterGroupBasicDemo {
    value = [
        { label: 'Space used', value: 15, color: 'var(--p-primary-color)' }
    ];
}`
    };
}
