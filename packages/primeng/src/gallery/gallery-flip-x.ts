import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryFlipXPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFlipX represents the horizontal flip action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-flip-x',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryFlipX }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('flipX')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'flipX'",
        '[attr.data-action]': "'flip-x'",
        '(click)': "gallery.handleClickAction('flipX')"
    },
    hostDirectives: [Bind]
})
export class GalleryFlipX extends BaseComponent<GalleryFlipXPassThrough> {
    componentName = 'GalleryFlipX';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
