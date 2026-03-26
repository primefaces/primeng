import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryFlipYPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFlipY represents the vertical flip action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-flip-y',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryFlipY }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('flipY')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'flipY'",
        '[attr.data-action]': "'flip-y'",
        '(click)': "gallery.handleClickAction('flipY')"
    },
    hostDirectives: [Bind]
})
export class GalleryFlipY extends BaseComponent<GalleryFlipYPassThrough> {
    componentName = 'GalleryFlipY';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
