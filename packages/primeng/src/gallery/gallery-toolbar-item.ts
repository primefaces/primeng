import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryToolbarItem represents an individual toolbar item.
 * @group Components
 */
@Component({
    selector: 'p-gallery-toolbar-item',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('toolbarItem')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'toolbarItem'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryToolbarItem {
    /**
     * The action to dispatch when the toolbar item is clicked.
     * @group Props
     */
    action = input<string>();

    gallery = inject(Gallery);

    onClick() {
        this.gallery.handleClickAction(this.action());
    }
}
