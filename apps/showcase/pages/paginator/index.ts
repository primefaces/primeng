import { AccessibilityDoc } from '@/doc/paginator/accessibility-doc';
import { BasicDoc } from '@/doc/paginator/basic-doc';
import { CurrentPageReportDoc } from '@/doc/paginator/currentpagereport-doc';
import { ImagesDoc } from '@/doc/paginator/images-doc';
import { ImportDoc } from '@/doc/paginator/import-doc';
import { TemplateDoc } from '@/doc/paginator/template-doc';
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
