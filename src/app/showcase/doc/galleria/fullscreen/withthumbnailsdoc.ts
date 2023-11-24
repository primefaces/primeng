import { Component, OnInit } from '@angular/core';
import { Code } from '../../../domain/code';
import { PhotoService } from '../../../service/photoservice';

@Component({
    selector: 'with-thumbnails-doc',
    template: `
        <app-docsectiontext>
            <p>Full screen mode is enabled by adding <i>fullScreen</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <button pButton type="button" icon="pi pi-external-link" label="Show" (click)="displayBasic = true"></button>
            <p-galleria [(value)]="images" [(visible)]="displayBasic" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '50%' }" [numVisible]="9" [circular]="true" [fullScreen]="true" [showItemNavigators]="true">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <div class="grid grid-nogutter justify-content-center">
                        <img [src]="item.thumbnailImageSrc" style="display: block;" />
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-full-screen-with-thumbnails-demo"></app-code>
    `
})
export class WithThumbnailsDoc implements OnInit {
    displayBasic: boolean | undefined;

    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }

    code: Code = {
        basic: `
<p-galleria [(value)]="images" [(visible)]="displayBasic" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '50%' }" [numVisible]="9" [circular]="true" [fullScreen]="true" [showItemNavigators]="true">
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
    <ng-template pTemplate="thumbnail" let-item>
        <div class="grid grid-nogutter justify-content-center">
            <img [src]="item.thumbnailImageSrc" style="display: block;" />
        </div>
    </ng-template>
</p-galleria>`,
        html: `
<div class="card flex justify-content-center">
    <button pButton type="button" icon="pi pi-external-link" label="Show" (click)="displayBasic = true"></button>
    <p-galleria [(value)]="images" [(visible)]="displayBasic" [responsiveOptions]="responsiveOptions" [containerStyle]="{'max-width': '50%'}" [numVisible]="9"
        [circular]="true" [fullScreen]="true" [showItemNavigators]="true">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;"/>
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center">
                <img [src]="item.thumbnailImageSrc" style="display: block;"/>
            </div>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-full-screen-with-thumbnails-demo',
    templateUrl: './galleria-full-screen-with-thumbnails-demo.html'
})
export class GalleriaFullScreenWithThumbnailsDemo implements OnInit {
    displayBasic: boolean | undefined;

    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
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
