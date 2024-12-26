import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';

@Component({
    selector: 'itemthumbnails-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Add <i>showItemNavigators</i> to display navigator elements and the left and right side.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [circular]="true" [numVisible]="5" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-navigator-item-thumbnails-demo"></app-code>
    `,
    providers: [PhotoService]
})
export class ItemThumbnailsDoc implements OnInit {
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

    code: Code = {
        basic: `<p-galleria [(value)]="images" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [circular]="true" [numVisible]="5" [containerStyle]="{ 'max-width': '640px' }">
    <ng-template #item let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <img [src]="item.thumbnailImageSrc" style="display: block;" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria [(value)]="images" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [circular]="true" [numVisible]="5" [containerStyle]="{ 'max-width': '640px' }">
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template #thumbnail let-item>
            <img [src]="item.thumbnailImageSrc" style="display: block;" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit, model } from '@angular/core';
import { PhotoService } from '@/service/photoservice';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-navigator-item-thumbnails-demo',
    templateUrl: './galleria-navigator-item-thumbnails-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaNavigatorItemThumbnailsDemo implements OnInit {
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
