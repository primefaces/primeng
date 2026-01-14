import { AccessibilityDoc } from '@/doc/skeleton/accessibility-doc';
import { CardDoc } from '@/doc/skeleton/card-doc';
import { DataTableDoc } from '@/doc/skeleton/datatable-doc';
import { ImportDoc } from '@/doc/skeleton/import-doc';
import { ListDoc } from '@/doc/skeleton/list-doc';
import { PTComponent } from '@/doc/skeleton/pt/PTComponent';
import { ShapesDoc } from '@/doc/skeleton/shapes-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Skeleton Component"
        header="Skeleton"
        description="Skeleton is a placeholder to display instead of the actual content."
        [docs]="docs"
        [apiDocs]="['Skeleton']"
        [ptDocs]="ptComponent"
        themeDocs="skeleton"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './skeletondemo.scss'
})
export class SkeletonDemo {
    ptComponent = PTComponent;

    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'shapes',
            label: 'Shapes',
            component: ShapesDoc
        },
        {
            id: 'card',
            label: 'Card',
            component: CardDoc
        },
        {
            id: 'list',
            label: 'List',
            component: ListDoc
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
