import { AccessibilityDoc } from '@/doc/colorpicker/accessibility-doc';
import { BasicDoc } from '@/doc/colorpicker/basic-doc';
import { DisabledDoc } from '@/doc/colorpicker/disabled-doc';
import { FormatDoc } from '@/doc/colorpicker/format-doc';
import { ImportDoc } from '@/doc/colorpicker/import-doc';
import { InlineDoc } from '@/doc/colorpicker/inline-doc';
import { PTComponent } from '@/doc/colorpicker/pt/PTComponent';
import { ReactiveFormsDoc } from '@/doc/colorpicker/reactiveforms-doc';
import { TemplateDrivenFormsDoc } from '@/doc/colorpicker/templatedrivenforms-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular ColorPicker Component"
        header="ColorPicker"
        description="ColorPicker is an input component to select a color."
        [docs]="docs"
        [apiDocs]="['ColorPicker']"
        themeDocs="colorpicker"
        [ptDocs]="ptComponent"
    ></app-doc>`
})
export class ColorPickerDemo {
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
            id: 'inline',
            label: 'Inline',
            component: InlineDoc
        },
        {
            id: 'format',
            label: 'Format',
            component: FormatDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
