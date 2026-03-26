import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/gallery/accessibility-doc';
import { BasicDoc } from '@/doc/gallery/basic-doc';
import { GridDoc } from '@/doc/gallery/grid-doc';
import { UsageDoc } from '@/doc/gallery/usage-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Gallery Component"
        header="Gallery"
        description="Gallery is an image viewer with zoom, rotate, flip and download capabilities."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="[
            'Gallery',
            'GalleryItem',
            'GalleryContent',
            'GalleryHeader',
            'GalleryFooter',
            'GalleryBackdrop',
            'GalleryToolbar',
            'GalleryToolbarItem',
            'GalleryPrev',
            'GalleryNext',
            'GalleryZoomIn',
            'GalleryZoomOut',
            'GalleryZoomToggle',
            'GalleryRotateLeft',
            'GalleryRotateRight',
            'GalleryFlipX',
            'GalleryFlipY',
            'GalleryFullScreen',
            'GalleryDownload',
            'GalleryThumbnail',
            'GalleryThumbnailItem'
        ]"
        themeDocs="gallery"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class GalleryDemo {
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                },
                {
                    id: 'grid',
                    label: 'Grid',
                    component: GridDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
