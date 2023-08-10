import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-thumbnail-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Galleria can be controlled programmatically using the <i>activeIndex</i> property.</p>
        </app-docsectiontext>
         <div class="card flex flex-column md:align-items-center">
            <div class="flex flex-wrap gap-3 mb-5">
                <p-radioButton *ngFor="let option of positionOptions" [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label"></p-radioButton>
            </div>
            <p-galleria [(value)]="images" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; min-height: 420px; display: block;" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <div class="grid grid-nogutter justify-content-center">
                        <img [src]="item.thumbnailImageSrc" />
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-thumbnail-demo"></app-code>
    </section>`
})
export class ThumbnailDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    images: any[] | undefined;

    position: string = 'bottom';

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

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
        this.photoService.getImages().then((images) => (this.images = images));
    }

    code: Code = {
        basic: `
<p-galleria [(value)]="images" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; min-height: 420px; display: block;" />
    </ng-template>
    <ng-template pTemplate="thumbnail" let-item>
        <div class="grid grid-nogutter justify-content-center">
            <img [src]="item.thumbnailImageSrc" />
        </div>
    </ng-template>
</p-galleria>`,
        html: `
 <div class="card md:flex md:justify-content-center">
    <div class="flex flex-wrap gap-3 mb-5">
        <p-radioButton *ngFor="let option of positionOptions;" [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label"></p-radioButton>
    </div>
    <p-galleria [(value)]="images" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5"> 
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; min-height: 420px; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center">
                <img [src]="item.thumbnailImageSrc" />
            </div>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-thumbnail-demo',
    templateUrl: './galleria-thumbnail-demo.html'
})
export class GalleriaThumbnailDemo implements OnInit {
    images: any[] | undefined;

    position: string = 'bottom';

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

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
