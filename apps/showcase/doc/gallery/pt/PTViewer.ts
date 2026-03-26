import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GalleryModule } from 'primeng/gallery';
import { Replay } from '@primeicons/angular/replay';
import { Refresh } from '@primeicons/angular/refresh';
import { SearchPlus } from '@primeicons/angular/search-plus';
import { SearchMinus } from '@primeicons/angular/search-minus';
import { ArrowsH } from '@primeicons/angular/arrows-h';
import { ArrowsV } from '@primeicons/angular/arrows-v';
import { Download } from '@primeicons/angular/download';
import { ArrowUpRightAndArrowDownLeftFromCenter } from '@primeicons/angular/arrow-up-right-and-arrow-down-left-from-center';
import { ArrowDownLeftAndArrowUpRightToCenter } from '@primeicons/angular/arrow-down-left-and-arrow-up-right-to-center';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

const photos: [number, number, number][] = [
    [10, 1200, 800],
    [11, 800, 1200],
    [15, 1400, 700],
    [16, 700, 1050],
    [17, 1000, 1000],
    [18, 1300, 650],
    [19, 600, 1200],
    [20, 1200, 900]
];

@Component({
    selector: 'gallery-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, GalleryModule, Replay, Refresh, SearchPlus, SearchMinus, ArrowsH, ArrowsV, Download, ArrowUpRightAndArrowDownLeftFromCenter, ArrowDownLeftAndArrowUpRightToCenter, ChevronLeft, ChevronRight],
    template: `
        <app-docptviewer [docs]="docs">
            <p-gallery class="w-full h-150">
                <p-gallery-backdrop></p-gallery-backdrop>
                <p-gallery-prev>
                    <svg data-p-icon="chevron-left"></svg>
                </p-gallery-prev>
                <p-gallery-next>
                    <svg data-p-icon="chevron-right"></svg>
                </p-gallery-next>
                <p-gallery-header class="justify-end gap-0.5">
                    <p-gallery-rotate-left>
                        <svg data-p-icon="replay"></svg>
                    </p-gallery-rotate-left>
                    <p-gallery-rotate-right>
                        <svg data-p-icon="refresh"></svg>
                    </p-gallery-rotate-right>
                    <p-gallery-zoom-in>
                        <svg data-p-icon="search-plus"></svg>
                    </p-gallery-zoom-in>
                    <p-gallery-zoom-out>
                        <svg data-p-icon="search-minus"></svg>
                    </p-gallery-zoom-out>
                    <p-gallery-flip-x>
                        <svg data-p-icon="arrows-h"></svg>
                    </p-gallery-flip-x>
                    <p-gallery-flip-y>
                        <svg data-p-icon="arrows-v"></svg>
                    </p-gallery-flip-y>
                    <p-gallery-download>
                        <svg data-p-icon="download"></svg>
                    </p-gallery-download>
                    <p-gallery-full-screen class="group">
                        <svg data-p-icon="arrow-up-right-and-arrow-down-left-from-center" class="group-data-fullscreen:hidden!"></svg>
                        <svg data-p-icon="arrow-down-left-and-arrow-up-right-to-center" class="hidden! group-data-fullscreen:block!"></svg>
                    </p-gallery-full-screen>
                </p-gallery-header>
                <p-gallery-content>
                    @for (image of images; track image) {
                        <p-gallery-item>
                            <img [src]="image" alt="image" />
                        </p-gallery-item>
                    }
                </p-gallery-content>
                <p-gallery-footer>
                    <p-gallery-thumbnail>
                        @for (image of images; track image; let i = $index) {
                            <p-gallery-thumbnail-item [index]="i">
                                <img [attr.draggable]="false" [src]="image" class="h-full w-full object-cover" />
                            </p-gallery-thumbnail-item>
                        }
                    </p-gallery-thumbnail>
                </p-gallery-footer>
            </p-gallery>
        </app-docptviewer>
    `
})
export class PTViewer {
    images = photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);

    docs = [
        { data: getPTOptions('Gallery'), key: 'Gallery' },
        { data: getPTOptions('GalleryBackdrop'), key: 'GalleryBackdrop' },
        { data: getPTOptions('GalleryHeader'), key: 'GalleryHeader' },
        { data: getPTOptions('GalleryContent'), key: 'GalleryContent' },
        { data: getPTOptions('GalleryItem'), key: 'GalleryItem' },
        { data: getPTOptions('GalleryFooter'), key: 'GalleryFooter' },
        { data: getPTOptions('GalleryPrev'), key: 'GalleryPrev' },
        { data: getPTOptions('GalleryNext'), key: 'GalleryNext' },
        { data: getPTOptions('GalleryZoomIn'), key: 'GalleryZoomIn' },
        { data: getPTOptions('GalleryZoomOut'), key: 'GalleryZoomOut' },
        { data: getPTOptions('GalleryZoomToggle'), key: 'GalleryZoomToggle' },
        { data: getPTOptions('GalleryRotateLeft'), key: 'GalleryRotateLeft' },
        { data: getPTOptions('GalleryRotateRight'), key: 'GalleryRotateRight' },
        { data: getPTOptions('GalleryFlipX'), key: 'GalleryFlipX' },
        { data: getPTOptions('GalleryFlipY'), key: 'GalleryFlipY' },
        { data: getPTOptions('GalleryDownload'), key: 'GalleryDownload' },
        { data: getPTOptions('GalleryFullScreen'), key: 'GalleryFullScreen' },
        { data: getPTOptions('GalleryThumbnail'), key: 'GalleryThumbnail' },
        { data: getPTOptions('GalleryThumbnailItem'), key: 'GalleryThumbnailItem' },
        { data: getPTOptions('GalleryToolbar'), key: 'GalleryToolbar' },
        { data: getPTOptions('GalleryToolbarItem'), key: 'GalleryToolbarItem' }
    ];
}
