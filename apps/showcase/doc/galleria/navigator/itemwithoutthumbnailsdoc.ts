import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, OnInit, model } from '@angular/core';

@Component({
    selector: 'itemwithoutthumbnails-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Simple example with indicators only.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-item-without-thumbnails-demo"></app-code>
    `,
    providers: [PhotoService]
})
export class ItemWithoutThumbnailsDoc implements OnInit {
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

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    code: Code = {
        basic: `<p-galleria [(value)]="images" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
    <ng-template #item let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria [(value)]="images" [numVisible]="5" [circular]="true" [showItemNavigators]="true" [showThumbnails]="false" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit, model } from '@angular/core';
import { PhotoService } from '@/service/photoservice';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-item-without-thumbnails-demo',
    templateUrl: './galleria-item-without-thumbnails-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaItemWithoutThumbnailsDemo implements OnInit {
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

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}`,
        data: `
/* PhotoService */
{
    itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
...`
    };
}
