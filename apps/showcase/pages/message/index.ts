import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/message/basic-doc';
import { FormDoc } from '@/doc/message/form-doc';
import { IconDoc } from '@/doc/message/icon-doc';
import { ImportDoc } from '@/doc/message/import-doc';
import { OutlinedDoc } from '@/doc/message/outlined-doc';
import { PTComponent } from '@/doc/message/pt/PTComponent';
import { SeverityDoc } from '@/doc/message/severity-doc';
import { SimpleDoc } from '@/doc/message/simple-doc';
import { SizesDoc } from '@/doc/message/sizes-doc';
import { DynamicDoc } from '@/doc/message/dynamic-doc';
import { ClosableDoc } from '@/doc/message/closable-doc';
import { LifeDoc } from '@/doc/message/life-doc';
import { AccessibilityDoc } from '@/doc/message/accessibility-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Message Component" header="Message" description="Message component is used to display inline messages." [docs]="docs" [apiDocs]="['Message']" [ptDocs]="ptComponent" themeDocs="message"></app-doc>`,
    imports: [AppDoc],
    standalone: true
})
export class MessageDemo {
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
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'outlined',
            label: 'Outlined',
            component: OutlinedDoc
        },
        {
            id: 'simple',
            label: 'Simple',
            component: SimpleDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            component: FormDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'closable',
            label: 'Closable',
            component: ClosableDoc
        },
        {
            id: 'life',
            label: 'Life',
            component: LifeDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
