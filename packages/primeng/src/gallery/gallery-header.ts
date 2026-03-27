import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryHeaderPassThrough } from 'primeng/types/gallery';

/**
 * GalleryHeader represents the header section of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-header',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryHeader }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('header')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'header'"
    },
    hostDirectives: [Bind]
})
export class GalleryHeader extends BaseComponent<GalleryHeaderPassThrough> {
    componentName = 'GalleryHeader';

    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
