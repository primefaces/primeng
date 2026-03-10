import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Adding more items to the array displays the meters in a group.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-metergroup [value]="value" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MultipleDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
