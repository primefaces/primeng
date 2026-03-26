import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryNextPassThrough } from 'primeng/types/gallery';

/**
 * GalleryNext represents the next navigation button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-next',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryNext }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('next')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'next'",
        '(click)': 'gallery.handleNext()'
    },
    hostDirectives: [Bind]
})
export class GalleryNext extends BaseComponent<GalleryNextPassThrough> {
    componentName = 'GalleryNext';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
