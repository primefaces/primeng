import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>Adding more items to the array displays the meters in a group.</p>
        </app-docsectiontext>
        <div class="card">
            <p-metergroup [value]="value" />
        </div>
        <app-code [code]="code" selector="meter-group-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
    code: Code = {
        basic: `<p-metergroup [value]="value" />`,

        html: `<div class="card">
    <p-metergroup [value]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MeterGroup } from 'primeng/metergroup';

@Component({
    selector: 'meter-group-multiple-demo',
    templateUrl: './meter-group-multiple-demo.html',
    standalone: true,
    imports: [MeterGroup]
})
export class MeterGroupMultipleDemo {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}`
    };
}
