import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PhotoService } from '@/service/photoservice';
import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'click-event-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Indicators are displayed at the bottom by enabling <i>showIndicators</i> property and interacted with the click event by default.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ClickEventDoc implements OnInit {
    private photoService = inject(PhotoService);

    images = model([]);

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
