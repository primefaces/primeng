import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, SkeletonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="w-full">
                <p-skeleton class="mb-2"></p-skeleton>
                <p-skeleton width="10rem" class="mb-2"></p-skeleton>
                <p-skeleton width="5rem" class="mb-2"></p-skeleton>
                <p-skeleton height="2rem" class="mb-2"></p-skeleton>
                <p-skeleton width="10rem" height="4rem"></p-skeleton>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Skeleton'),
            key: 'Skeleton'
        }
    ];
}
