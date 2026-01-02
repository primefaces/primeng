import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'label-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                The position of the labels relative to the meters is defined using the <i>labelPosition</i> property. The default orientation of the labels is horizontal, and the vertical alternative is available through the
                <i>labelOrientation</i> option.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
        </div>
        <app-code selector="meter-group-label-demo"></app-code>
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
