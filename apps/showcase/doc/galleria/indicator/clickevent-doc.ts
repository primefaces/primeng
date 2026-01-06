import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PhotoService } from '@/service/photoservice';
import { CommonModule } from '@angular/common';
import { Component, OnInit, model } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'clickevent-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Indicators are displayed at the bottom by enabling <i>showIndicators</i> property and interacted with the click event by default.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code></app-code>
    `
})
export class ClickEventDoc implements OnInit {
    images = model([]);

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
