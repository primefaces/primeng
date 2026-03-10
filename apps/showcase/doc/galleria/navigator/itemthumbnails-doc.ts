import { PhotoService } from '@/service/photoservice';
import { Component, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'itemthumbnails-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Add <i>showItemNavigators</i> to display navigator elements and the left and right side.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-galleria [(value)]="images" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [circular]="true" [numVisible]="5" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block;" />
                </ng-template>
            </p-galleria>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [PhotoService]
})
export class ItemThumbnailsDoc implements OnInit {
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
