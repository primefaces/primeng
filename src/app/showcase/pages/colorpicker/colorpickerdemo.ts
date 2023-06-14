import { Component } from '@angular/core';
import { InlineDoc } from '../../doc/colorpicker/inlinedoc';
import { BasicDoc } from '../../doc/colorpicker/basicdoc';
import { ImportDoc } from '../../doc/colorpicker/importdoc';
import { FormatDoc } from '../../doc/colorpicker/formatdoc';
import { DisabledDoc } from '../../doc/colorpicker/disableddoc';
import { StyleDoc } from '../../doc/colorpicker/styledoc';
import { AccessibilityDoc } from '../../doc/colorpicker/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/colorpicker/reactiveformsdoc';

@Component({
    templateUrl: './colorpickerdemo.html'
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
