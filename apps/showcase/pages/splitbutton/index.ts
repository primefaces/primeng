import { AccessibilityDoc } from '@/doc/splitbutton/accessibility-doc';
import { BasicDoc } from '@/doc/splitbutton/basic-doc';
import { DisabledDoc } from '@/doc/splitbutton/disabled-doc';
import { IconsDoc } from '@/doc/splitbutton/icons-doc';
import { ImportDoc } from '@/doc/splitbutton/import-doc';
import { NestedDoc } from '@/doc/splitbutton/nested-doc';
import { OutlinedDoc } from '@/doc/splitbutton/outlined-doc';
import { RaisedDoc } from '@/doc/splitbutton/raised-doc';
import { RaisedTextDoc } from '@/doc/splitbutton/raisedtext-doc';
import { RoundedDoc } from '@/doc/splitbutton/rounded-doc';
import { SeverityDoc } from '@/doc/splitbutton/severity-doc';
import { SizesDoc } from '@/doc/splitbutton/sizes-doc';
import { TemplateDoc } from '@/doc/splitbutton/template-doc';
import { TextDoc } from '@/doc/splitbutton/text-doc';
import { PTComponent } from '@/doc/splitbutton/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular SplitButton Component"
        header="SplitButton"
        description="SplitButton groups a set of commands in an overlay with a default action item."
        [docs]="docs"
        [apiDocs]="['SplitButton']"
        [ptDocs]="ptComponent"
        themeDocs="splitbutton"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class SplitButtonDemo {
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
            id: 'icons',
            label: 'Icons',
            component: IconsDoc
        },
        {
            id: 'nested',
            label: 'Nested',
            component: NestedDoc
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'raised',
            label: 'Raised',
            component: RaisedDoc
        },
        {
            id: 'rounded',
            label: 'Rounded',
            component: RoundedDoc
        },
        {
            id: 'text',
            label: 'Text',
            component: TextDoc
        },
        {
            id: 'raisedtext',
            label: 'Raised Text',
            component: RaisedTextDoc
        },
        {
            id: 'outlined',
            label: 'Outlined',
            component: OutlinedDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
