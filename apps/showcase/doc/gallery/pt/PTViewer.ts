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

@Component({
    selector: 'gallery-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, GalleryModule, Replay, Refresh, SearchPlus, SearchMinus, ArrowsH, ArrowsV, Download, ArrowUpRightAndArrowDownLeftFromCenter, ArrowDownLeftAndArrowUpRightToCenter, ChevronLeft, ChevronRight],
    template: `
        <app-docptviewer [docs]="docs">
            <p-gallery class="w-full h-150">
                <p-gallery-backdrop></p-gallery-backdrop>
                <button pGalleryPrev>
                    <svg data-p-icon="chevron-left"></svg>
                </button>
                <button pGalleryNext>
                    <svg data-p-icon="chevron-right"></svg>
                </button>
                <p-gallery-header class="justify-end gap-0.5">
                    <button pGalleryRotateLeft>
                        <svg data-p-icon="replay"></svg>
                    </button>
                    <button pGalleryRotateRight>
                        <svg data-p-icon="refresh"></svg>
                    </button>
                    <button pGalleryZoomIn>
                        <svg data-p-icon="search-plus"></svg>
                    </button>
                    <button pGalleryZoomOut>
                        <svg data-p-icon="search-minus"></svg>
                    </button>
                    <button pGalleryFlipX>
                        <svg data-p-icon="arrows-h"></svg>
                    </button>
                    <button pGalleryFlipY>
                        <svg data-p-icon="arrows-v"></svg>
                    </button>
                    <button pGalleryDownload>
                        <svg data-p-icon="download"></svg>
                    </button>
                    <button pGalleryFullScreen class="group">
                        <svg data-p-icon="arrow-up-right-and-arrow-down-left-from-center" class="group-data-fullscreen:hidden!"></svg>
                        <svg data-p-icon="arrow-down-left-and-arrow-up-right-to-center" class="hidden! group-data-fullscreen:block!"></svg>
                    </button>
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
                        <p-gallery-thumbnail-content>
                            @for (image of images; track image; let i = $index) {
                                <p-gallery-thumbnail-item [index]="i">
                                    <img [attr.draggable]="false" [src]="image" class="h-full w-full object-cover" />
                                </p-gallery-thumbnail-item>
                            }
                        </p-gallery-thumbnail-content>
                    </p-gallery-thumbnail>
                </p-gallery-footer>
            </p-gallery>
        </app-docptviewer>
    `
})
export class PTViewer {
    // [picsum photo id, width, height]
    photos: [number, number, number][] = [
        [10, 1200, 800],
        [11, 800, 1200],
        [15, 1400, 700],
        [16, 700, 1050],
        [17, 1000, 1000],
        [18, 1300, 650],
        [19, 600, 1200],
        [20, 1200, 900],
        [27, 750, 1125],
        [28, 1400, 800],
        [29, 800, 1100],
        [36, 1100, 700],
        [37, 650, 1300],
        [39, 1200, 750],
        [42, 900, 1200],
        [43, 1300, 800],
        [47, 700, 1400],
        [48, 1000, 800],
        [49, 800, 1000],
        [50, 1400, 600],
        [52, 600, 900],
        [53, 1200, 1200],
        [54, 900, 600],
        [55, 750, 1000],
        [56, 1100, 800],
        [57, 1400, 900],
        [58, 850, 1275],
        [59, 1000, 600],
        [60, 600, 1000],
        [64, 1300, 1300]
    ];

    images = this.photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);

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
        { data: getPTOptions('GalleryThumbnailContent'), key: 'GalleryThumbnailContent' },
        { data: getPTOptions('GalleryThumbnailItem'), key: 'GalleryThumbnailItem' },
        { data: getPTOptions('GalleryToolbar'), key: 'GalleryToolbar' },
        { data: getPTOptions('GalleryToolbarItem'), key: 'GalleryToolbarItem' }
    ];
}
