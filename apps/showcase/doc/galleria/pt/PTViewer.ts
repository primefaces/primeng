import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, GalleriaModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-galleria [value]="images" [numVisible]="3" [responsiveOptions]="responsiveOptions" [showItemNavigators]="true" [showThumbnails]="true">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <div class="grid gap-4 justify-center">
                        <img [src]="item.thumbnailImageSrc" [alt]="item.alt" style="display: block" />
                    </div>
                </ng-template>
            </p-galleria>
        </app-docptviewer>
    `
})
export class PTViewer {
    images = [
        {
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
            alt: 'Image 1'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
            alt: 'Image 2'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
            alt: 'Image 3'
        }
    ];

    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    docs = [
        {
            data: getPTOptions('Galleria'),
            key: 'Galleria'
        }
    ];
}
