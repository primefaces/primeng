import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'min-max-doc',
    template: `
        <app-docsectiontext>
            <p>Boundaries are configured with the <i>min</i> and <i>max</i> values whose defaults are 0 and 100 respectively.</p>
        </app-docsectiontext>
        <div class="card">
            <p-meterGroup [value]="value" [max]="200"></p-meterGroup>
        </div>
        <app-code [code]="code" selector="meter-group-min-max-demo"></app-code>
    `
})
export class MinMaxDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
    code: Code = {
        basic: `<p-meterGroup [value]="value" [max]="200"></p-meterGroup>`,

        html: `<div class="card">
<p-meterGroup [value]="value" [max]="200"></p-meterGroup>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'meter-group-min-max-demo',
    templateUrl: './meter-group-min-max-demo.html'
})
export class MeterGroupMinMaxDemo{
   
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
 
}`
    };
}
