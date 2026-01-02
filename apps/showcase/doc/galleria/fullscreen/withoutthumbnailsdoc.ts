import { PhotoService } from '@/service/photoservice';
import { Component, OnInit, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'without-thumbnails-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Thumbnails can also be hidden in full screen mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button icon="pi pi-external-link" label="Show" (click)="displayBasic = true" />
            <p-galleria
                [(value)]="images"
                [(visible)]="displayBasic"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '850px' }"
                [numVisible]="7"
                [circular]="true"
                [fullScreen]="true"
                [showThumbnails]="false"
                [showItemNavigators]="true"
            >
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code selector="galleria-full-screen-without-thumbnails-demo"></app-code>
    `
})
export class WithoutThumbnailsDoc implements OnInit {
    displayBasic: boolean | undefined;

    images = model([]);

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
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
}
