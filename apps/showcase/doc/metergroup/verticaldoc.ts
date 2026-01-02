import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Layout of the MeterGroup is configured with the <i>orientation</i> property that accepts either <i>horizontal</i> or <i>vertical</i> as available options.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-metergroup [value]="value" orientation="vertical" labelOrientation="vertical" [style]="{ height: '300px' }" />
        </div>
        <app-code selector="meter-group-vertical-demo"></app-code>
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
