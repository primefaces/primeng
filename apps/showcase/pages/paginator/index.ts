import { AccessibilityDoc } from '@/doc/paginator/accessibilitydoc';
import { BasicDoc } from '@/doc/paginator/basicdoc';
import { CurrentPageReportDoc } from '@/doc/paginator/currentpagereportdoc';
import { ImagesDoc } from '@/doc/paginator/imagesdoc';
import { ImportDoc } from '@/doc/paginator/importdoc';
import { TemplateDoc } from '@/doc/paginator/templatedoc';
import { PTComponent } from '@/doc/paginator/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Paginator Component"
        header="Paginator"
        description="Paginator displays data in paged format and provides navigation between pages."
        [docs]="docs"
        [apiDocs]="['Paginator']"
        [ptDocs]="ptComponent"
        themeDocs="paginator"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styles: `
        .image-gallery {
            text-align: center;
            padding: 1rem;
        }
    `
})
export class PaginatorDemo {
    ptComponent = PTComponent;

    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'current-page-report',
            label: 'Current Page Report',
            component: CurrentPageReportDoc
        },
        {
            id: 'images',
            label: 'Images',
            component: ImagesDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
