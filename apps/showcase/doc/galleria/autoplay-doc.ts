import { PhotoService } from '@/service/photoservice';
import { Component, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'autoplay-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A slideshow implementation is defined by adding <i>circular</i> and <i>autoPlay</i> properties.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-galleria [(value)]="images" [autoPlay]="true" [circular]="true" [responsiveOptions]="responsiveOptions" [numVisible]="5" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block" />
                </ng-template>
            </p-galleria>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class AutoPlayDoc implements OnInit {
    private photoService = inject(PhotoService);

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

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
