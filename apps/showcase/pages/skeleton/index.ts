import { AccessibilityDoc } from '@/doc/skeleton/accessibilitydoc';
import { CardDoc } from '@/doc/skeleton/carddoc';
import { DataTableDoc } from '@/doc/skeleton/datatabledoc';
import { ImportDoc } from '@/doc/skeleton/importdoc';
import { ListDoc } from '@/doc/skeleton/listdoc';
import { ShapesDoc } from '@/doc/skeleton/shapesdoc';
import { SkeletonDocModule } from '@/doc/skeleton/skeletondoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Skeleton Component" header="Skeleton" description="Skeleton is a placeholder to display instead of the actual content." [docs]="docs" [apiDocs]="['Skeleton']" themeDocs="skeleton"></app-doc>`,
    standalone: true,
    imports: [SkeletonDocModule],
    styleUrl: './skeletondemo.scss'
})
export class SkeletonDemo {
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
