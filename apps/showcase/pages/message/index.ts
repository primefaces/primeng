import { AccessibilityDoc } from '@/doc/message/accessibilitydoc';
import { BasicDoc } from '@/doc/message/basicdoc';
import { ClosableDoc } from '@/doc/message/closabledoc';
import { DynamicDoc } from '@/doc/message/dynamicdoc';
import { FormDoc } from '@/doc/message/formdoc';
import { IconDoc } from '@/doc/message/icondoc';
import { ImportDoc } from '@/doc/message/importdoc';
import { LifeDoc } from '@/doc/message/lifedoc';
import { MessageDocModule } from '@/doc/message/messagedoc.module';
import { OutlinedDoc } from '@/doc/message/outlineddoc';
import { SeverityDoc } from '@/doc/message/severitydoc';
import { SimpleDoc } from '@/doc/message/simpledoc';
import { SizesDoc } from '@/doc/message/sizesdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Message Component" header="Message" description="Message component is used to display inline messages." [docs]="docs" [apiDocs]="['Message']" themeDocs="message"></app-doc>`,
    imports: [MessageDocModule],
    standalone: true
})
export class MessageDemo {
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
