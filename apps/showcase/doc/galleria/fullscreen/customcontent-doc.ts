import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PhotoService } from '@/service/photoservice';
import { Component, inject, model, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'custom-content-doc',
    standalone: true,
    imports: [GalleriaModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Using <i>activeIndex</i>, Galleria is displayed with a specific initial image.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                @if (images() && images().length > 0) {
                    <div class="grid grid-cols-12 gap-4" style="max-width: 800px;">
                        @for (image of images(); track $index; let index = $index) {
                            <div class="col-span-4" key="index">
                                <img [src]="image.thumbnailImageSrc" [alt]="image.alt" style="cursor: pointer" (click)="imageClick(index)" />
                            </div>
                        }
                    </div>
                }
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
        </app-demo-wrapper>
    `
})
export class CustomContentDoc implements OnInit {
    private photoService = inject(PhotoService);

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

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
