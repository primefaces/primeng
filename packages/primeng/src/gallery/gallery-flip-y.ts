import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryFlipY represents the vertical flip action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-flip-y',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
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
export class GalleryFlipY extends BaseComponent {
    gallery = inject(Gallery);
}
