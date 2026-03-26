import { AppDocPtTable } from '@/components/doc/app.docpttable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'carousel-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>Carousel Pass Through</h1>
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
            id: 'pt.doc.carouselcontent',
            label: 'CarouselContent PT Options',
            component: AppDocPtTable,
            data: getPTOptions('CarouselContent')
        },
        {
            id: 'pt.doc.carouselitem',
            label: 'CarouselItem PT Options',
            component: AppDocPtTable,
            data: getPTOptions('CarouselItem')
        },
        {
            id: 'pt.doc.carouselindicators',
            label: 'CarouselIndicators PT Options',
            component: AppDocPtTable,
            data: getPTOptions('CarouselIndicators')
        }
    ];
}
