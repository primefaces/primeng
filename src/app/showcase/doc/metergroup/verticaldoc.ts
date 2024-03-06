import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Layout of the MeterGroup is configured with the <i>orientation</i> property that accepts either <i>horizontal</i> or <i>vertical</i> as available options.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-meterGroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }"></p-meterGroup>
        </div>
        <app-code [code]="code" selector="metergroup-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
    code: Code = {
        basic: `<p-meterGroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }"></p-meterGroup>`,

        html: `<div class="card flex justify-content-center">
<p-meterGroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }"></p-meterGroup>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'meter-group-vertical-demo',
    templateUrl: './meter-group-vertical-demo.html'
})
export class MeterGroupVerticalDemo {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}`
    };
}
