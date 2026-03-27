import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryToolbarItemPassThrough } from 'primeng/types/gallery';

/**
 * GalleryToolbarItem represents an individual toolbar item.
 * @group Components
 */
@Component({
    selector: 'p-gallery-toolbar-item',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryToolbarItem }],
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
export class GalleryToolbarItem extends BaseComponent<GalleryToolbarItemPassThrough> {
    componentName = 'GalleryToolbarItem';

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * The action to dispatch when the toolbar item is clicked.
     * @group Props
     */
    action = input<string>();

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onClick() {
        this.gallery.handleClickAction(this.action());
    }
}
