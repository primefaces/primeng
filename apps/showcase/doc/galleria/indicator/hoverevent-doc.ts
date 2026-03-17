import { PhotoService } from '@/service/photoservice';
import { Component, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'hover-event-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Indicators can be activated on hover instead of click if <i>changeItemOnIndicatorHover</i> is added.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-galleria [(value)]="images" [showIndicators]="true" [showThumbnails]="false" [changeItemOnIndicatorHover]="true" [containerStyle]="{ 'max-width': '640px' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class HoverEventDoc implements OnInit {
    private photoService = inject(PhotoService);

    images = model([]);

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
