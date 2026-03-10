import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Layout of the MeterGroup is configured with the <i>orientation</i> property that accepts either <i>horizontal</i> or <i>vertical</i> as available options.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-metergroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class VerticalDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
