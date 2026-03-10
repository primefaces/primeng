import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'label-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                The position of the labels relative to the meters is defined using the <i>labelPosition</i> property. The default orientation of the labels is horizontal, and the vertical alternative is available through the
                <i>labelOrientation</i> option.
            </p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class LabelDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}
