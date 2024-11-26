import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'hover-doc',
    template: `
        <app-docsectiontext>
            <p>Navigators are displayed on hover only if <i>showItemNavigatorsOnHover</i> is enabled.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [showIndicators]="false" [showItemNavigatorsOnHover]="true" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <img [src]="item.thumbnailImageSrc" style="display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-navigator-hover-demo"></app-code>
    `,
    providers: [PhotoService]
})
export class HoverDoc implements OnInit {
    images: any[] | undefined;

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
        this.photoService.getImages().then((images) => {
            this.images = images;
        });
    }

    code: Code = {
        basic: `<p-galleria [(value)]="images" [showIndicators]="false" [showItemNavigatorsOnHover]="true" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
    <ng-template pTemplate="thumbnail" let-item>
        <img [src]="item.thumbnailImageSrc" style="display: block;" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria [(value)]="images" [showIndicators]="false" [showItemNavigatorsOnHover]="true" [showItemNavigators]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <img [src]="item.thumbnailImageSrc" style="display: block;" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@/service/photoservice';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-navigator-hover-demo',
    templateUrl: './galleria-navigator-hover-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaNavigatorHoverDemo implements OnInit {
    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4,
        },
        {
            breakpoint: '575px',
            numVisible: 1,
        },
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
