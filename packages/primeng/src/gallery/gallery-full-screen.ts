import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryFullScreen represents the fullscreen toggle button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-full-screen',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
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
export class GalleryFullScreen extends BaseComponent {
    gallery = inject(Gallery);

    dataFullscreen = computed(() => (this.gallery.isFullscreen() ? '' : null));

    onClick() {
        this.gallery.handleClickAction('toggleFullScreen');
    }
}
