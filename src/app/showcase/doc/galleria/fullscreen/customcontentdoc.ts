import { Component, OnInit } from '@angular/core';
import { Code } from '../../../domain/code';
import { PhotoService } from '../../../service/photoservice';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Using <i>activeIndex</i>, Galleria is displayed with a specific initial image.</p>
        </app-docsectiontext>
        <div class="card">
            <div *ngIf="images" class="grid" style="max-width: 800px;">
                <div *ngFor="let image of images; let index = index" class="col-3" key="index">
                    <img [src]="image.thumbnailImageSrc" [alt]="image.alt" style="cursor: pointer" (click)="imageClick(index)" />
                </div>
            </div>
            <p-galleria
                [(value)]="images"
                [(visible)]="displayCustom"
                [(activeIndex)]="activeIndex"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '850px' }"
                [numVisible]="7"
                [circular]="true"
                [fullScreen]="true"
                [showItemNavigators]="true"
                [showThumbnails]="false"
            >
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-full-secreen-template-demo"></app-code>
    `
})
export class FullScreenTemplateDoc implements OnInit {

    displayCustom: boolean | undefined;

    activeIndex: number = 0;

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

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }

    code: Code = {
        basic: `
<p-galleria
    [(value)]="images"
    [(visible)]="displayCustom"
    [(activeIndex)]="activeIndex"
    [responsiveOptions]="responsiveOptions"
    [containerStyle]="{ 'max-width': '850px' }"
    [numVisible]="7"
    [circular]="true"
    [fullScreen]="true"
    [showItemNavigators]="true"
    [showThumbnails]="false"
>
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
</p-galleria>
        `,
        html: `
 <div class="card">
    <div *ngIf="images" class="grid" style="max-width: 800px;">
        <div *ngFor="let image of images; let index = index" class="col-3" key="index">
            <img [src]="image.thumbnailImageSrc" [alt]="image.alt" style="cursor: pointer" (click)="imageClick(index)" />
        </div>
    </div>
    <p-galleria
        [(value)]="images"
        [(visible)]="displayCustom"
        [(activeIndex)]="activeIndex"
        [responsiveOptions]="responsiveOptions"
        [containerStyle]="{ 'max-width': '850px' }"
        [numVisible]="7"
        [circular]="true"
        [fullScreen]="true"
        [showItemNavigators]="true"
        [showThumbnails]="false"
    >
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-full-secreen-template-demo',
    templateUrl: './galleria-full-secreen-template-demo.html'
})
export class GalleriaFullScreenTemplateDemo implements OnInit {
    displayCustom: boolean | undefined;

    activeIndex: number = 0;

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

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
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
