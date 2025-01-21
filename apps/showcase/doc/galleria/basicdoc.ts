import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';

@Component({
    selector: 'galleria-basic-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Galleria requires a <i>value</i> as a collection of images, <i>item</i> template for the higher resolution image and <i>thumbnail</i> template to display as a thumbnail.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width:100%" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
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
        <img [src]="item.itemImageSrc" style="width:100%" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <img [src]="item.thumbnailImageSrc" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" style="width:100%" />
        </ng-template>
        <ng-template #thumbnail let-item>
            <img [src]="item.thumbnailImageSrc" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import {Component, model, OnInit} from '@angular/core';

@Component({
    selector: 'galleria-basic-demo',
    templateUrl: './galleria-basic-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaBasicDemo implements OnInit {
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
