import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/keyfilter/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/keyfilter/accessibilitydoc';
import { ImportDoc } from '@doc/keyfilter/importdoc';
import { PresetsDoc } from '@doc/keyfilter/presetsdoc';
import { RegexDoc } from '@doc/keyfilter/regexdoc';
import { KeyFilterDocModule } from '@doc/keyfilter/keyfilterdoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular KeyFilter Component"
        header="KeyFilter"
        description="KeyFilter is a built-in feature of InputText to restrict user input based on a regular expression."
        [docs]="docs"
        [apiDocs]="['KeyFilter']"
    ></app-doc>`,
    standalone: true,
    imports: [KeyFilterDocModule],
})
export class KeyFilterDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'presets',
            label: 'Presets',
            component: PresetsDoc,
        },
        {
            id: 'regex',
            label: 'Regex',
            component: RegexDoc,
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
