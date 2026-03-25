import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
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

// [picsum photo id, width, height]
const photos: [number, number, number][] = [
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

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [GalleryModule, AppCode, AppDemoWrapper, AppDocSectionText, Replay, Refresh, SearchPlus, SearchMinus, ArrowsH, ArrowsV, Download, ArrowUpRightAndArrowDownLeftFromCenter, ArrowDownLeftAndArrowUpRightToCenter, ChevronLeft, ChevronRight],
    template: `
        <app-docsectiontext>
            <p>Gallery provides a composition-based API with sub-components for full control over the layout. Each part of the gallery (header, content, footer, toolbar, thumbnails) is a separate component.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-gallery class="w-full h-150!">
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
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    images = photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);
}
