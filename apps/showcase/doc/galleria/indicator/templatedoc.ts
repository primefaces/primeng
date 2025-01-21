import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, OnInit, model } from '@angular/core';

@Component({
    selector: 'template-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Indicator content can be customized with the <i>indicator</i> template.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [showIndicatorsOnItem]="true" indicatorsPosition="left" [containerStyle]="{ maxWidth: '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template #indicator let-index>
                    <span style="color: #ffffff; cursor: pointer">
                        {{ index + 1 }}
                    </span>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-indicator-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
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
        basic: `<p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [showIndicatorsOnItem]="true" indicatorsPosition="left" [containerStyle]="{ 'max-width': '100%', 'margin-top': '2em' }">
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
    <ng-template pTemplate="indicator" let-index>
        <span style="color: #ffffff; cursor: pointer">
            {{ index + 1 }}
        </span>
    </ng-template>
</p-galleria>`,
        html: `
 <div class="card">
    <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [showIndicatorsOnItem]="true" indicatorsPosition="left" [containerStyle]="{ 'max-width': '100%','margin-top': '2em' }">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="indicator" let-index>
            <span style="color: #ffffff; cursor: pointer">
                {{index + 1}}
            </span>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { Component, OnInit, model } from '@angular/core';
import { PhotoService } from '@/service/photoservice';

@Component({
    selector: 'galleria-indicator-template-demo',
    templateUrl: './galleria-indicator-template-demo.html'
})
export class GalleriaIndicatorTemplateDemo implements OnInit {
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
