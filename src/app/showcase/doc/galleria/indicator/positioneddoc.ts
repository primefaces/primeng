import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { PhotoService } from '@service/photoservice';

@Component({
    selector: 'positioned-doc',
    template: `
        <app-docsectiontext>
            <p>
                Indicators can be placed at four different sides using the <i>indicatorsPosition</i> property. In addition, enabling <i>showIndicatorsOnItem</i> moves the indicators inside the image section. <i>indicatorsPosition</i> set to
                <i>bottom</i> by default, accepted values are <i>top</i>, <i>left</i>, <i>right</i>, and <i>bottom</i>.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-3 mb-5">
                <p-radioButton *ngFor="let option of positionOptions" [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label" />
            </div>
            <div class="flex align-items-center">
                <p-checkbox [(ngModel)]="showIndicatorsOnItem" [binary]="true" inputId="binary" label="Inside" ngClass="mt-3" />
            </div>
            <p-galleria
                [(value)]="images"
                [indicatorsPosition]="position"
                [showIndicators]="true"
                [showThumbnails]="false"
                [showIndicatorsOnItem]="showIndicatorsOnItem"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '640px', 'margin-top': '2em' }"
            >
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-indicator-positioned-demo"></app-code>
    `
})
export class PositionedDoc implements OnInit {
    images: any[] | undefined;

    position: string = 'bottom';

    showIndicatorsOnItem: boolean = false;

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
        this.photoService.getImages().then((images) => {
            this.images = images;
        });
    }

    code: Code = {
        basic: `<p-galleria
    [(value)]="images"
    [indicatorsPosition]="position"
    [showIndicators]="true"
    [showThumbnails]="false"
    [showIndicatorsOnItem]="showIndicatorsOnItem"
    [responsiveOptions]="responsiveOptions"
    [containerStyle]="{ 'max-width': '640px', 'margin-top': '2em' }"
>
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <div class="flex flex-wrap gap-3 mb-5">
        <p-radioButton 
            *ngFor="let option of positionOptions;" 
            [name]="option.label" 
            [value]="option.value" 
            [label]="option.label" 
            [(ngModel)]="position" [inputId]="label" />
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            [(ngModel)]="showIndicatorsOnItem" 
            [binary]="true" 
            inputId="binary" 
            label="Inside" 
            ngClass="mt-3" />
    </div>
    <p-galleria 
        [(value)]="images" 
        [indicatorsPosition]="position" 
        [showIndicators]="true" 
        [showThumbnails]="false" 
        [showIndicatorsOnItem]="showIndicatorsOnItem" 
        [responsiveOptions]="responsiveOptions" 
        [containerStyle]="{'width': '100%','margin-top': '2em'}">
            <ng-template pTemplate="item" let-item>
                <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
            </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@service/photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'galleria-indicator-positioned-demo',
    templateUrl: './galleria-indicator-positioned-demo.html',
    standalone: true,
    imports: [GalleriaModule, RadioButtonModule, CheckboxModule, FormsModule],
    providers: [PhotoService]
})
export class GalleriaIndicatorPositionedDemo implements OnInit {
    images: any[] | undefined;

    position: string = 'bottom';

    showIndicatorsOnItem: boolean = false;

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
...`,
        service: ['PhotoService']
    };
}
