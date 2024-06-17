import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>MeterGroup requires a <i>value</i> as the data to display where each item in the collection should be a type of <i>MeterItem</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-meterGroup [value]="value" />
        </div>
        <app-code [code]="code" selector="meter-group-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value = [{ label: 'Space used', value: 15, color: '#34d399' }];

    code: Code = {
        basic: `<p-meterGroup [value]="value" />`,

        html: `<div class="card">
    <p-meterGroup [value]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    selector: 'meter-group-basic-demo',
    templateUrl: './meter-group-basic-demo.html',
    standalone: true,
    imports: [MeterGroupModule]
})
export class MeterGroupBasicDemo {
    value = [
        { label: 'Space used', value: 15, color: '#34d399' }
    ];
}`
    };
}
