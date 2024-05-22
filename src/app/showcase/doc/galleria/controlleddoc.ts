import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { PhotoService } from '@service/photoservice';

@Component({
    selector: 'galleria-controlled-demo',
    template: `
        <app-docsectiontext>
            <p>Galleria can be controlled programmatically using the <i>activeIndex</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="py-2">
                <p-button type="button" icon="pi pi-minus" (click)="prev()" severity="secondary" styleClass="mr-2" />
                <p-button type="button" icon="pi pi-plus" (click)="next()" />
            </div>
            <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5" [(activeIndex)]="activeIndex">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%;" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <div class="grid grid-nogutter justify-content-center">
                        <img [src]="item.thumbnailImageSrc" />
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-controlled-demo"></app-code>
    `
})
export class ControlledDoc implements OnInit {
    images: any[] | undefined;

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
            this._activeIndex = newValue;
        }
    }

    _activeIndex: number = 2;

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

    next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
    }

    code: Code = {
        basic: `<div class="py-2">
    <p-button 
        type="button" 
        icon="pi pi-minus" 
        (click)="prev()" 
        severity="secondary" 
        styleClass="mr-2" />
    <p-button 
        type="button" 
        icon="pi pi-plus" 
        (click)="next()" />
</div>
<p-galleria 
    [(value)]="images" 
    [responsiveOptions]="responsiveOptions" 
    [containerStyle]="{ 'max-width': '640px' }" 
    [numVisible]="5" 
    [(activeIndex)]="activeIndex">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center">
                <img [src]="item.thumbnailImageSrc" />
            </div>
        </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <div class="py-2">
        <p-button 
            type="button" 
            icon="pi pi-minus" 
            (click)="prev()" 
            severity="secondary" 
            styleClass="mr-2" />
        <p-button 
            type="button" 
            icon="pi pi-plus" 
            (click)="next()" />
    </div>
    <p-galleria 
        [(value)]="images" 
        [responsiveOptions]="responsiveOptions" 
        [containerStyle]="{ 'max-width': '640px' }" 
        [numVisible]="5" 
        [(activeIndex)]="activeIndex">
            <ng-template pTemplate="item" let-item>
                <img [src]="item.itemImageSrc" style="width: 100%;" />
            </ng-template>
            <ng-template pTemplate="thumbnail" let-item>
                <div class="grid grid-nogutter justify-content-center">
                    <img [src]="item.thumbnailImageSrc" />
                </div>
            </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@service/photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'galleria-controlled-demo',
    templateUrl: './galleria-controlled-demo.html',
    standalone: true,
    imports: [GalleriaModule, ButtonModule],
    providers: [PhotoService]
})
export class GalleriaControlledDemo implements OnInit {
    images: any[] | undefined;

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
            this._activeIndex = newValue;
        }
    }

    _activeIndex: number = 2;

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

    next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
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
