import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';

@Component({
    selector: 'timeline-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, TimelineModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-timeline [value]="events()">
                <ng-template #content let-event>
                    {{ event.status }}
                </ng-template>
            </p-timeline>
        </app-docptviewer>
    `
})
export class PTViewer {
    events = signal<any[]>([
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ]);

    docs = [
        {
            data: getPTOptions('Timeline'),
            key: 'Timeline'
        }
    ];
}
