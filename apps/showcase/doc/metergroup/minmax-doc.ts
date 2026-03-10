import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'minmax-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Boundaries are configured with the <i>min</i> and <i>max</i> values whose defaults are 0 and 100 respectively.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-metergroup [value]="value" [max]="200" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MinMaxDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
