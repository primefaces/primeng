import { PhotoService } from '@/service/photoservice';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'thumbnail-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, GalleriaModule, RadioButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Galleria can be controlled programmatically using the <i>activeIndex</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-4 mb-8">
                <div *ngFor="let option of positionOptions" class="flex items-center">
                    <p-radiobutton [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="option.label" />
                    <label [for]="option.label" class="ml-2"> {{ option.label }} </label>
                </div>
            </div>
            <p-galleria [value]="images()" [thumbnailsPosition]="position" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <div class="grid gap-4 justify-center">
                        <img [src]="item.thumbnailImageSrc" style="width: 100%; display: block" />
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code></app-code>
    `
})
export class ThumbnailDoc implements OnInit {
    private photoService = inject(PhotoService);

    images = signal<any[]>([]);

    position: 'left' | 'right' | 'top' | 'bottom' = 'bottom';

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

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
