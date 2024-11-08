import { Component } from '@angular/core';
import { TextDoc } from '@doc/splitbutton/textdoc';
import { BasicDoc } from '@doc/splitbutton/basicdoc';
import { IconsDoc } from '@doc/splitbutton/iconsdoc';
import { ImportDoc } from '@doc/splitbutton/importdoc';
import { NestedDoc } from '@doc/splitbutton/nesteddoc';
import { RaisedDoc } from '@doc/splitbutton/raiseddoc';
import { RoundedDoc } from '@doc/splitbutton/roundeddoc';
import { SeverityDoc } from '@doc/splitbutton/severitydoc';
import { RaisedTextDoc } from '@doc/splitbutton/raisedtextdoc';
import { OutlinedDoc } from '@doc/splitbutton/outlineddoc';
import { SizesDoc } from '@doc/splitbutton/sizesdoc';
import { DisabledDoc } from '@doc/splitbutton/disableddoc';
import { TemplateDoc } from '@doc/splitbutton/templatedoc';
import { AccessibilityDoc } from '@doc/splitbutton/accessibilitydoc';
import { SplitButtonDocModule } from '@doc/splitbutton/splitbuttondoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular SplitButton Component"
        header="SplitButton"
        description="SplitButton groups a set of commands in an overlay with a default action item."
        [docs]="docs"
        [apiDocs]="['SplitButton']"
        themeDocs="splitbutton"
    ></app-doc>`,
    standalone: true,
    imports: [SplitButtonDocModule],
})
export class SplitButtonDemo {
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
            id: 'icons',
            label: 'Icons',
            component: IconsDoc,
        },
        {
            id: 'nested',
            label: 'Nested',
            component: NestedDoc,
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc,
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc,
        },
        {
            id: 'raised',
            label: 'Raised',
            component: RaisedDoc,
        },
        {
            id: 'rounded',
            label: 'Rounded',
            component: RoundedDoc,
        },
        {
            id: 'text',
            label: 'Text',
            component: TextDoc,
        },
        {
            id: 'raisedtext',
            label: 'Raised Text',
            component: RaisedTextDoc,
        },
        {
            id: 'outlined',
            label: 'Outlined',
            component: OutlinedDoc,
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
