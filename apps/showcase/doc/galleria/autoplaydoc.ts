import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'galleria-autoplay-demo',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A slideshow implementation is defined by adding <i>circular</i> and <i>autoPlay</i> properties.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [autoPlay]="true" [circular]="true" [responsiveOptions]="responsiveOptions" [numVisible]="5" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code selector="galleria-autoplay-demo"></app-code>
    `
})
export class AutoPlayDoc implements OnInit {
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

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
