import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryBackdrop represents the backdrop element for fullscreen mode.
 * @group Components
 */
@Component({
    selector: 'p-gallery-backdrop',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('backdrop')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'backdrop'"
    },
    hostDirectives: [Bind]
})
export class GalleryBackdrop extends BaseComponent {
    gallery = inject(Gallery);
}
