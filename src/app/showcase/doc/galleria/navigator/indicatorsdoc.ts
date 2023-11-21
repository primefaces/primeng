import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from 'src/app/showcase/layout/doc/app.docsectiontext.component';
import { Code } from '../../../domain/code';
import { PhotoService } from '../../../service/photoservice';

@Component({
    selector: 'indicators-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>Navigators and Indicators can be combined as well.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria
                [(value)]="images"
                [showItemNavigators]="true"
                [showThumbnails]="false"
                [showIndicators]="true"
                [showIndicatorsOnItem]="true"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '640px', 'margin-top': '2em' }"
            >
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
        <app-code [code]="code" selector="galleria-navigator-indicators-demo"></app-code>
    </section>`,
    providers: [PhotoService]
})
export class IndicatorsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => {
            this.images = images;
        });
    }

    code: Code = {
        basic: `
<p-galleria [(value)]="images" [showItemNavigators]="true" [showThumbnails]="false" [showIndicators]="true" [showIndicatorsOnItem]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px', 'margin-top': '2em' }">
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
 <div class="card">
    <p-galleria [(value)]="images" [showItemNavigators]="true" [showThumbnails]="false" [showIndicators]="true" [showIndicatorsOnItem]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px', 'margin-top':'2em' }"> 
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center">
                <img [src]="item.thumbnailImageSrc" style="display: block;" />
            </div>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-navigator-indicators-demo',
    templateUrl: './galleria-navigator-indicators-demo.html',
    providers: [PhotoService]
})
export class GalleriaNavigatorIndicatorsDemo implements OnInit {
    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => {
            this.images = images;
        });
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
