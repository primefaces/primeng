import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PhotoService } from '@/service/photoservice';
import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'custom-content-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Using <i>activeIndex</i>, Galleria is displayed with a specific initial image.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div *ngIf="images() && images().length > 0" class="grid grid-cols-12 gap-4" style="max-width: 800px;">
                <div *ngFor="let image of images(); let index = index" class="col-span-4" key="index">
                    <img [src]="image.thumbnailImageSrc" [alt]="image.alt" style="cursor: pointer" (click)="imageClick(index)" />
                </div>
            </div>
            <p-galleria
                [(value)]="images"
                [(visible)]="displayCustom"
                [(activeIndex)]="activeIndex"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '850px' }"
                [numVisible]="7"
                [circular]="true"
                [fullScreen]="true"
                [showItemNavigators]="true"
                [showThumbnails]="false"
            >
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code></app-code>
    `
})
export class CustomContentDoc implements OnInit {
    displayCustom: boolean | undefined;

    activeIndex: number = 0;

    images = model([]);

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
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
