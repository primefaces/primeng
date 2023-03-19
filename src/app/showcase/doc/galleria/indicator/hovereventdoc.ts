import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../../domain/code';
import { PhotoService } from '../../../service/photoservice';

@Component({
    selector: 'galleria-indicator-hover-event-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3">
            <p>Indicators can be activated on hover instead of click if <i>changeItemOnIndicatorHover</i> is added.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [changeItemOnIndicatorHover]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{ width: '100%' }">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.previewImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-indicator-hover-event-demo"></app-code>
    </section>`
})
export class GalleriaIndicatorHoverEventDemo implements OnInit {
    @Input() id: string;

    @Input() title: string;

    images: any[];

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
<p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [changeItemOnIndicatorHover]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{'width': '100%'}"> 
    <ng-template pTemplate="item" let-item>
        <img [src]="item.previewImageSrc" style="width: 100%; display: block;" />
    </ng-template>
</p-galleria>`,
        html: `
<div class="card">
    <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [changeItemOnIndicatorHover]="true" [responsiveOptions]="responsiveOptions" [containerStyle]="{'width': '100%'}"> 
        <ng-template pTemplate="item" let-item>
            <img [src]="item.previewImageSrc" style="width: 100%; display: block;" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-indicator-hover-event-demo',
    templateUrl: './galleria-indicator-hover-event-demo.html',
    styleUrls: ['./galleria-indicator-hover-event-demo.scss']
})
export class GalleriaIndicatorHoverEventDemo implements OnInit {
    images: any[];

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
    itemImageSrc: 'https://primereact.org/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primereact.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
...`,
        service: ['PhotoService']
    };
}
