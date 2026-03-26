import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryRotateRight represents the rotate right action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-rotate-right',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('rotateRight')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'rotateRight'",
        '[attr.data-action]': "'rotate-right'",
        '(click)': "gallery.handleClickAction('rotateRight')"
    },
    hostDirectives: [Bind]
})
export class GalleryRotateRight extends BaseComponent {
    gallery = inject(Gallery);
}
