import { AccessibilityDoc } from '@/doc/divider/accessibilitydoc';
import { BasicDoc } from '@/doc/divider/basicdoc';
import { ContentDoc } from '@/doc/divider/contentdoc';
import { DividerDocModule } from '@/doc/divider/dividerdoc.module';
import { ImportDoc } from '@/doc/divider/importdoc';
import { LoginDoc } from '@/doc/divider/logindoc';
import { TypeDoc } from '@/doc/divider/typedoc';
import { VerticalDoc } from '@/doc/divider/verticaldoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [DividerDocModule],
    template: ` <app-doc docTitle="Angular Divider Component" header="Divider" description="Divider is used to separate contents." [docs]="docs" [apiDocs]="['Divider']" themeDocs="divider"></app-doc> `
})
export class DividerDemo {
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
            id: 'type',
            label: 'Type',
            component: TypeDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'content',
            label: 'Content',
            component: ContentDoc
        },
        {
            id: 'login',
            label: 'Login',
            component: LoginDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
