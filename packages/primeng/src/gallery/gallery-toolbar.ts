import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryToolbarPassThrough } from 'primeng/types/gallery';

/**
 * GalleryToolbar represents the toolbar container.
 * @group Components
 */
@Component({
    selector: 'p-gallery-toolbar',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryToolbar }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('toolbar')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'toolbar'"
    },
    hostDirectives: [Bind]
})
export class GalleryToolbar extends BaseComponent<GalleryToolbarPassThrough> {
    componentName = 'GalleryToolbar';

    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
