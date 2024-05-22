import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { PhotoService } from '@service/photoservice';

@Component({
    selector: 'without-thumbnails-doc',
    template: `
        <app-docsectiontext>
            <p>Thumbnails can also be hidden in full screen mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button icon="pi pi-external-link" label="Show" (click)="displayBasic = true" />
            <p-galleria
                [(value)]="images"
                [(visible)]="displayBasic"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '850px' }"
                [numVisible]="7"
                [circular]="true"
                [fullScreen]="true"
                [showThumbnails]="false"
                [showItemNavigators]="true"
            >
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-full-screen-without-thumbnails-demo"></app-code>
    `
})
export class WithoutThumbnailsDoc implements OnInit {
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
        basic: `<p-galleria
    [(value)]="images"
    [(visible)]="displayBasic"
    [responsiveOptions]="responsiveOptions"
    [containerStyle]="{ 'max-width': '850px' }"
    [numVisible]="7"
    [circular]="true"
    [fullScreen]="true"
    [showItemNavigators]="true"
    [showThumbnails]="false">
        <ng-template pTemplate="item" let-item>
            <img 
                [src]="item.itemImageSrc" 
                style="width: 100%; display: block;" />
        </ng-template>
</p-galleria>`,
        html: `<div class="card flex justify-content-center">
    <p-button 
    icon="pi pi-external-link" 
    label="Show" 
    (click)="displayBasic = true" />
        <p-galleria
            [(value)]="images"
            [(visible)]="displayBasic"
            [responsiveOptions]="responsiveOptions"
            [containerStyle]="{ 'max-width': '850px' }"
            [numVisible]="7"
            [circular]="true"
            [fullScreen]="true"
            [showItemNavigators]="true"
            [showThumbnails]="false">
                <ng-template pTemplate="item" let-item>
                    <img 
                        [src]="item.itemImageSrc" 
                        style="width: 100%; display: block;" />
                </ng-template>
        </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@service/photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'galleria-full-screen-without-thumbnails-demo',
    templateUrl: './galleria-full-screen-without-thumbnails-demo.html',
    standalone: true,
    imports: [GalleriaModule, ButtonModule],
    providers: [PhotoService]
})
export class GalleriaFullScreenWithoutThumbnailsDemo implements OnInit {
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
