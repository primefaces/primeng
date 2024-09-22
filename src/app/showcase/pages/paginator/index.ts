import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/paginator/accessibilitydoc';
import { BasicDoc } from '@doc/paginator/basicdoc';
import { ImportDoc } from '@doc/paginator/importdoc';
import { TemplateDoc } from '@doc/paginator/templatedoc';
import { LocaleDoc } from '@doc/paginator/localedoc';
import { CurrentPageReportDoc } from '@doc/paginator/currentpagereportdoc';
import { PaginatorDocModule } from '@doc/paginator/paginatordoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Paginator Component"
        header="Paginator"
        description="Paginator displays data in paged format and provides navigation between pages."
        [docs]="docs"
        [apiDocs]="['Paginator']"
        themeDocs="paginator"
    ></app-doc>`,
    standalone: true,
    imports: [PaginatorDocModule],
    styles: `
        .image-gallery {
            text-align: center;
            padding: 1rem;
        }
    `,
})
export class PaginatorDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'locale',
            label: 'Locale',
            component: LocaleDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'current-page-report',
            label: 'Current Page Report',
            component: CurrentPageReportDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
