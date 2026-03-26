import { AppDocPtTable } from '@/components/doc/app.docpttable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'gallery-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>Gallery Pass Through</h1>
        </div>
        <app-docsection [docs]="docs" />
    </div>`
})
export class PTComponent {
    docs = [
        {
            id: 'pt.viewer',
            label: 'Viewer',
            component: PTViewer
        },
        {
            id: 'pt.doc.gallery',
            label: 'Gallery PT Options',
            component: AppDocPtTable,
            data: getPTOptions('Gallery')
        },
        {
            id: 'pt.doc.gallerybackdrop',
            label: 'GalleryBackdrop PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryBackdrop')
        },
        {
            id: 'pt.doc.galleryheader',
            label: 'GalleryHeader PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryHeader')
        },
        {
            id: 'pt.doc.gallerycontent',
            label: 'GalleryContent PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryContent')
        },
        {
            id: 'pt.doc.galleryitem',
            label: 'GalleryItem PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryItem')
        },
        {
            id: 'pt.doc.galleryfooter',
            label: 'GalleryFooter PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryFooter')
        },
        {
            id: 'pt.doc.galleryprev',
            label: 'GalleryPrev PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryPrev')
        },
        {
            id: 'pt.doc.gallerynext',
            label: 'GalleryNext PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryNext')
        },
        {
            id: 'pt.doc.galleryzoomin',
            label: 'GalleryZoomIn PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryZoomIn')
        },
        {
            id: 'pt.doc.galleryzoomout',
            label: 'GalleryZoomOut PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryZoomOut')
        },
        {
            id: 'pt.doc.galleryzoomtoggle',
            label: 'GalleryZoomToggle PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryZoomToggle')
        },
        {
            id: 'pt.doc.galleryrotateleft',
            label: 'GalleryRotateLeft PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryRotateLeft')
        },
        {
            id: 'pt.doc.galleryrotateright',
            label: 'GalleryRotateRight PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryRotateRight')
        },
        {
            id: 'pt.doc.galleryflipx',
            label: 'GalleryFlipX PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryFlipX')
        },
        {
            id: 'pt.doc.galleryflipy',
            label: 'GalleryFlipY PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryFlipY')
        },
        {
            id: 'pt.doc.gallerydownload',
            label: 'GalleryDownload PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryDownload')
        },
        {
            id: 'pt.doc.galleryfullscreen',
            label: 'GalleryFullScreen PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryFullScreen')
        },
        {
            id: 'pt.doc.gallerythumbnail',
            label: 'GalleryThumbnail PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryThumbnail')
        },
        {
            id: 'pt.doc.gallerythumbnailcontent',
            label: 'GalleryThumbnailContent PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryThumbnailContent')
        },
        {
            id: 'pt.doc.gallerythumbnailitem',
            label: 'GalleryThumbnailItem PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryThumbnailItem')
        },
        {
            id: 'pt.doc.gallerytoolbar',
            label: 'GalleryToolbar PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryToolbar')
        },
        {
            id: 'pt.doc.gallerytoolbaritem',
            label: 'GalleryToolbarItem PT Options',
            component: AppDocPtTable,
            data: getPTOptions('GalleryToolbarItem')
        }
    ];
}
