import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryFullScreenPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFullScreen represents the fullscreen toggle button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-full-screen',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryFullScreen }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('fullScreen')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'fullScreen'",
        '[attr.data-action]': "'fullscreen'",
        '[attr.data-fullscreen]': 'dataFullscreen()',
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryFullScreen extends BaseComponent<GalleryFullScreenPassThrough> {
    componentName = 'GalleryFullScreen';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    dataFullscreen = computed(() => (this.gallery.isFullscreen() ? '' : null));

    onClick() {
        this.gallery.handleClickAction('toggleFullScreen');
    }
}
