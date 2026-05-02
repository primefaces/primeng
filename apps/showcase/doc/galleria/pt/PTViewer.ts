import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { PhotoService } from '@/service/photoservice';
import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, GalleriaModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width:100%" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" />
                </ng-template>
            </p-galleria>
        </app-docptviewer>
    `
})
export class PTViewer {
    images = model([]);

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    docs = [
        {
            data: getPTOptions('Galleria'),
            key: 'Galleria'
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
