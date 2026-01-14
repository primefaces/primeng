import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'caption-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Description of an image is specified with the <i>caption</i> template.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block;" />
                </ng-template>
                <ng-template #caption let-item>
                    <div class="text-xl mb-2 font-bold">{{ item.title }}</div>
                    <p class="text-white">{{ item.alt }}</p>
                </ng-template>
            </p-galleria>
        </div>
        <app-code></app-code>
    `
})
export class CaptionDoc implements OnInit {
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
