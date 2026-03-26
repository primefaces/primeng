import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryRotateLeftPassThrough } from 'primeng/types/gallery';

/**
 * GalleryRotateLeft represents the rotate left action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-rotate-left',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryRotateLeft }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('rotateLeft')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'rotateLeft'",
        '[attr.data-action]': "'rotate-left'",
        '(click)': "gallery.handleClickAction('rotateLeft')"
    },
    hostDirectives: [Bind]
})
export class GalleryRotateLeft extends BaseComponent<GalleryRotateLeftPassThrough> {
    componentName = 'GalleryRotateLeft';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
