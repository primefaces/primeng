import { AccessibilityDoc } from '@/doc/colorpicker/accessibilitydoc';
import { BasicDoc } from '@/doc/colorpicker/basicdoc';
import { ColorPickerDocModule } from '@/doc/colorpicker/colorpickerdoc.module';
import { DisabledDoc } from '@/doc/colorpicker/disableddoc';
import { FormatDoc } from '@/doc/colorpicker/formatdoc';
import { ImportDoc } from '@/doc/colorpicker/importdoc';
import { InlineDoc } from '@/doc/colorpicker/inlinedoc';
import { ReactiveFormsDoc } from '@/doc/colorpicker/reactiveformsdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ColorPickerDocModule],
    template: ` <app-doc docTitle="Angular ColorPicker Component" header="ColorPicker" description="ColorPicker is an input component to select a color." [docs]="docs" [apiDocs]="['ColorPicker']" themeDocs="colorpicker"></app-doc>`
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
}
