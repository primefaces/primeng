import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryBackdropPassThrough } from 'primeng/types/gallery';

/**
 * GalleryBackdrop represents the backdrop element for fullscreen mode.
 * @group Components
 */
@Component({
    selector: 'p-gallery-backdrop',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryBackdrop }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('backdrop')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'backdrop'"
    },
    hostDirectives: [Bind]
})
export class GalleryBackdrop extends BaseComponent<GalleryBackdropPassThrough> {
    componentName = 'GalleryBackdrop';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
