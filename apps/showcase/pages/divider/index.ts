import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/divider/accessibility-doc';
import { BasicDoc } from '@/doc/divider/basic-doc';
import { ContentDoc } from '@/doc/divider/content-doc';
import { ImportDoc } from '@/doc/divider/import-doc';
import { LoginDoc } from '@/doc/divider/login-doc';
import { PTComponent } from '@/doc/divider/pt/PTComponent';
import { TypeDoc } from '@/doc/divider/type-doc';
import { VerticalDoc } from '@/doc/divider/vertical-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Divider Component" header="Divider" description="Divider is used to separate contents." [docs]="docs" [apiDocs]="['Divider']" themeDocs="divider" [ptDocs]="ptComponent"></app-doc> `
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

    ptComponent = PTComponent;
}
