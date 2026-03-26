import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryRotateRightPassThrough } from 'primeng/types/gallery';

/**
 * GalleryRotateRight represents the rotate right action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-rotate-right',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryRotateRight }],
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
export class GalleryRotateRight extends BaseComponent<GalleryRotateRightPassThrough> {
    componentName = 'GalleryRotateRight';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
