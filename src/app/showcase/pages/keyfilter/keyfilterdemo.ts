import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '../../doc/keyfilter/reactiveformsdoc';
import { AccessibilityDoc } from '../../doc/keyfilter/accessibilitydoc';
import { ImportDoc } from '../../doc/keyfilter/importdoc';
import { PresetsDoc } from '../../doc/keyfilter/presetsdoc';
import { RegexDoc } from '../../doc/keyfilter/regexdoc';

@Component({
    templateUrl: './keyfilterdemo.html'
})
export class KeyFilterDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'presets',
            label: 'Presets',
            component: PresetsDoc
        },
        {
            id: 'regex',
            label: 'Regex',
            component: RegexDoc
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
