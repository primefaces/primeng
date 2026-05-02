import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'badge-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, BadgeModule, OverlayBadgeModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="flex flex-wrap gap-8">
                <p-badge value="2"></p-badge>
                <p-overlaybadge value="3">
                    <i class="pi pi-bell" style="font-size: 2rem"></i>
                </p-overlaybadge>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Badge'),
            key: 'Badge'
        },
        {
            data: getPTOptions('OverlayBadge'),
            key: 'OverlayBadge'
        }
    ];
}
