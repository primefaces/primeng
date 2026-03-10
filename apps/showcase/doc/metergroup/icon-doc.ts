import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Icons can be displayed next to the labels instead of the default marker.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-metergroup [value]="value" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IconDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];
}
