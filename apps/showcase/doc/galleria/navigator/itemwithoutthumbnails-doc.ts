import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PhotoService } from '@/service/photoservice';
import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'item-without-thumbnails-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Simple example with indicators only.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-galleria [(value)]="images" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [PhotoService]
})
export class ItemWithoutThumbnailsDoc implements OnInit {
    private photoService = inject(PhotoService);

    images = model([]);

    responsiveOptions: any[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
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
