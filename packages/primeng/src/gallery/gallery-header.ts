import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryHeader represents the header section of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-header',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('header')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'header'"
    },
    hostDirectives: [Bind]
})
export class GalleryHeader extends BaseComponent {
    gallery = inject(Gallery);
}
