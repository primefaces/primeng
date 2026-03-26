import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { CarouselModule } from 'primeng/carousel';
import { Gallery } from './gallery';
import { GalleryThumbnailItem } from './gallery-thumbnail-item';

/**
 * GalleryThumbnail represents the thumbnail carousel wrapper.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail',
    standalone: true,
    imports: [BindModule, NgTemplateOutlet, CarouselModule],
    template: `
        <p-carousel [autoSize]="autoSize()" [loop]="loop()" [align]="align()" [spacing]="spacing()" [orientation]="orientation()" [snapType]="snapType()" [slidesPerPage]="slidesPerPage()" [slide]="slide()">
            <p-carousel-content>
                @if (thumbnailItems().length > 0) {
                    @for (item of thumbnailItems(); track item; let i = $index) {
                        <p-carousel-item [class]="item.hostClass()" [attr.data-active]="item.dataActive()" (click)="item.onClick()">
                            <ng-container *ngTemplateOutlet="item.templateRef()"></ng-container>
                        </p-carousel-item>
                    }
                } @else {
                    <ng-content></ng-content>
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

    /**
     * Whether the carousel should auto size items.
     * @group Props
     * @defaultValue true
     */
    autoSize = input(true, { transform: booleanAttribute });

    /**
     * Whether the carousel should loop.
     * @group Props
     * @defaultValue true
     */
    loop = input(true, { transform: booleanAttribute });

    /**
     * Alignment of the carousel items.
     * @group Props
     * @defaultValue 'center'
     */
    align = input<'start' | 'center' | 'end'>('center');

    /**
     * Spacing between carousel items in pixels.
     * @group Props
     * @defaultValue 8
     */
    spacing = input(8, { transform: numberAttribute });

    /**
     * Orientation of the carousel.
     * @group Props
     * @defaultValue 'horizontal'
     */
    orientation = input<'horizontal' | 'vertical'>('horizontal');

    /**
     * Scroll snap type applied to the track.
     * @group Props
     * @defaultValue 'mandatory'
     */
    snapType = input<'mandatory' | 'proximity'>('mandatory');

    /**
     * How many slides are visible per page.
     * @group Props
     * @defaultValue 1
     */
    slidesPerPage = input(1, { transform: numberAttribute });

    thumbnailItems = contentChildren(GalleryThumbnailItem, { descendants: true });

    slide = computed(() => this.gallery.activeIndex());
}
