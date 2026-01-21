import { PhotoService } from '@/service/photoservice';
import { Component, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'controlled-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Galleria can be controlled programmatically using the <i>activeIndex</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="mb-4">
                <p-button type="button" icon="pi pi-minus" (click)="prev()" />
                <p-button type="button" icon="pi pi-plus" (click)="next()" severity="secondary" styleClass="ml-2" />
            </div>
            <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5" [(activeIndex)]="activeIndex">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%;" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <img [src]="item.thumbnailImageSrc" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code></app-code>
    `
})
export class ControlledDoc implements OnInit {
    private photoService = inject(PhotoService);

    images = model([]);

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images() && 0 <= newValue && newValue <= this.images().length - 1) {
            this._activeIndex = newValue;
        }
    }

    _activeIndex: number = 2;

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

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
    }
}
