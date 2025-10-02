import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'indicators-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Navigators and Indicators can be combined as well.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria
                [(value)]="images"
                [showItemNavigators]="true"
                [showThumbnails]="false"
                [showIndicators]="true"
                [showItemNavigatorsOnHover]="true"
                [circular]="true"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '640px' }"
            >
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-navigator-indicators-demo"></app-code>
    `,
    providers: [PhotoService]
})
export class IndicatorsDoc implements OnInit {
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
        basic: `<p-galleria [(value)]="images" [showItemNavigators]="true" [showThumbnails]="false" [showIndicators]="true" [showItemNavigatorsOnHover]="true" [circular]="true"[responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
    <ng-template #item let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <img [src]="item.thumbnailImageSrc" style="display: block;" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria [(value)]="images" [showItemNavigators]="true" [showThumbnails]="false" [showIndicators]="true" [showItemNavigatorsOnHover]="true" [circular]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
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
    selector: 'galleria-navigator-indicators-demo',
    templateUrl: './galleria-navigator-indicators-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaNavigatorIndicatorsDemo implements OnInit {
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
