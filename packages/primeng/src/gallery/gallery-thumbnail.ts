import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { CarouselModule } from 'primeng/carousel';
import { Gallery } from './gallery';
import { GalleryThumbnailItem } from './gallery-thumbnail-item';

/**
 * GalleryThumbnail represents the thumbnail carousel wrapper.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail, p-galleryThumbnail',
    standalone: true,
    imports: [BindModule, NgTemplateOutlet, CarouselModule],
    template: `
        <p-carousel [autoSize]="true" [loop]="true" align="center" [spacing]="8" [slide]="slide()">
            <p-carousel-content>
                @for (item of thumbnailItems(); track item; let i = $index) {
                    <p-carousel-item>
                        <div [class]="gallery.cx('thumbnailItem')" [attr.data-scope]="'gallery'" [attr.data-part]="'thumbnailItem'" [attr.data-active]="item.isActive() ? '' : null" (click)="item.onClick()">
                            <ng-container *ngTemplateOutlet="item.templateRef()"></ng-container>
                        </div>
                    </p-carousel-item>
                }
            </p-carousel-content>
        </p-carousel>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('thumbnail')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'thumbnail'"
    },
    hostDirectives: [Bind]
})
export class GalleryThumbnail {
    gallery = inject(Gallery);

    thumbnailItems = contentChildren(GalleryThumbnailItem, { descendants: true });

    slide = computed(() => this.gallery.activeIndex());
}
