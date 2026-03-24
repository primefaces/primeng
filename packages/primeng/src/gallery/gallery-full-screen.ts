import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import type { GalleryFullScreenTemplateContext } from 'primeng/types/gallery';
import { GalleryRoot } from './gallery';

/**
 * GalleryFullScreen represents the fullscreen toggle button.
 * Supports a template that receives isFullscreen state.
 * @group Components
 */
@Component({
    selector: 'p-gallery-full-screen, p-galleryFullScreen',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule],
    template: `
        @if (fullscreenTemplate()) {
            <ng-container *ngTemplateOutlet="fullscreenTemplate(); context: { $implicit: gallery.isFullscreen() }"></ng-container>
        } @else {
            <ng-content></ng-content>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('fullScreen')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'fullScreen'",
        '[attr.data-action]': "'fullscreen'",
        '[attr.data-fullscreen]': "gallery.isFullscreen() ? '' : null",
        '(click)': "gallery.handleClickAction('toggleFullScreen')"
    },
    hostDirectives: [Bind]
})
export class GalleryFullScreen {
    gallery = inject(GalleryRoot);

    /**
     * Custom fullscreen content template.
     * @param {GalleryFullScreenTemplateContext} context - fullscreen context.
     * @group Templates
     */
    fullscreenTemplate = contentChild<TemplateRef<GalleryFullScreenTemplateContext>>('fullscreen', { descendants: false });
}
