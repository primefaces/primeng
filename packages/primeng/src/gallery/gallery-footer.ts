import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryFooterPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFooter represents the footer section of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-footer',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryFooter }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('footer')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'footer'"
    },
    hostDirectives: [Bind]
})
export class GalleryFooter extends BaseComponent<GalleryFooterPassThrough> {
    componentName = 'GalleryFooter';

    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
