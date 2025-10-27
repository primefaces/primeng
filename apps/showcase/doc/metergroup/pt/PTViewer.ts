import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    selector: 'metergroup-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, MeterGroupModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-metergroup [value]="value" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];

    docs = [
        {
            data: getPTOptions('MeterGroup'),
            key: 'MeterGroup'
        }
    ];
}
