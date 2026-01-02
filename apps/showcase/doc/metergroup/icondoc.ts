import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [MeterGroupModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Icons can be displayed next to the labels instead of the default marker.</p>
        </app-docsectiontext>
        <div class="card">
            <p-metergroup [value]="value" />
        </div>
        <app-code selector="meter-group-icon-demo"></app-code>
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
