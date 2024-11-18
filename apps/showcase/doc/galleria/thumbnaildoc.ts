import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'galleria-thumbnail-demo',
    template: `
        <app-docsectiontext>
            <p>Galleria can be controlled programmatically using the <i>activeIndex</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-4 mb-8">
                <div *ngFor="let option of positionOptions" class="flex items-center">
                    <p-radiobutton [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label" />
                    <label [for]="option.label" class="ml-2"> {{ option.label }} </label>
                </div>
            </div>
            <p-galleria [(value)]="images" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <div class="grid gap-4 justify-center">
                        <img [src]="item.thumbnailImageSrc" style="width: 100%; display: block" />
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-thumbnail-demo"></app-code>
    `
})
export class ThumbnailDoc implements OnInit {
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
        this.photoService.getImages().then((images) => (this.images = images));
    }

    code: Code = {
        basic: `<div class="flex flex-wrap gap-4 mb-8">
    <div *ngFor="let option of positionOptions" class="flex items-center">
        <p-radiobutton [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label" />
        <label [for]="option.label" class="ml-2"> {{ option.label }} </label>
    </div>
</div>
<p-galleria [(value)]="images" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5" >
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block" />
    </ng-template>
    <ng-template pTemplate="thumbnail" let-item>
        <div class="grid gap-4 justify-center">
            <img [src]="item.thumbnailImageSrc" style="width: 100%; display: block" />
        </div>
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <div class="flex flex-wrap gap-4 mb-8">
        <div *ngFor="let option of positionOptions" class="flex items-center">
            <p-radiobutton [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label" />
            <label [for]="option.label" class="ml-2"> {{ option.label }} </label>
        </div>
    </div>
    <p-galleria [(value)]="images" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid gap-4 justify-center">
                <img [src]="item.thumbnailImageSrc" style="width: 100%; display: block" />
            </div>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@/service/photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'galleria-thumbnail-demo',
    templateUrl: './galleria-thumbnail-demo.html',
    standalone: true,
    imports: [GalleriaModule, RadioButton, FormsModule],
    providers: [PhotoService]
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
