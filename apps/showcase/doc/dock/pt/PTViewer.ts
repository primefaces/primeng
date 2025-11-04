import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'dock-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, DockModule, TooltipModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="relative w-full">
                <p-dock [model]="items">
                    <ng-template #item let-item>
                        <img [pTooltip]="item.label" tooltipPosition="top" [alt]="item.label" [src]="item.icon" style="width: 100%" />
                    </ng-template>
                </p-dock>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    items = [
        {
            label: 'Finder',
            icon: 'https://primefaces.org/cdn/primevue/images/dock/finder.svg'
        },
        {
            label: 'App Store',
            icon: 'https://primefaces.org/cdn/primevue/images/dock/appstore.svg'
        },
        {
            label: 'Photos',
            icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg'
        },
        {
            label: 'Trash',
            icon: 'https://primefaces.org/cdn/primevue/images/dock/trash.png'
        }
    ];

    docs = [
        {
            data: getPTOptions('Dock'),
            key: 'Dock'
        }
    ];
}
