import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';

@Component({
    selector: 'galleria-caption-demo',
    standalone: false,
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
        <app-code [code]="code" selector="galleria-caption-demo"></app-code>
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

    code: Code = {
        basic: `<p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
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
</p-galleria>`,
        html: `<div class="card">
    <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;"  />
        </ng-template>
        <ng-template #thumbnail let-item>
            <img [src]="item.thumbnailImageSrc" style="display: block;" />
        </ng-template>
        <ng-template #caption let-item>
            <div class="text-xl mb-2 font-bold">{{ item.title }}</div>
            <p class="text-white">{{ item.alt }}</p>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit, model } from '@angular/core';
import { PhotoService } from '@/service/photoservice';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-caption-demo',
    templateUrl: './galleria-caption-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaCaptionDemo implements OnInit {
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
...`,
        service: ['PhotoService']
    };
}
