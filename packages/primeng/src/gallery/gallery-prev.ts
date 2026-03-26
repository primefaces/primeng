import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryPrevPassThrough } from 'primeng/types/gallery';

/**
 * GalleryPrev represents the previous navigation button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-prev',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryPrev }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('prev')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'prev'",
        '(click)': 'gallery.handlePrev()'
    },
    hostDirectives: [Bind]
})
export class GalleryPrev extends BaseComponent<GalleryPrevPassThrough> {
    componentName = 'GalleryPrev';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
