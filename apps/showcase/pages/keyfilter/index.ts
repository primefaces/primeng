import { AccessibilityDoc } from '@/doc/keyfilter/accessibilitydoc';
import { ImportDoc } from '@/doc/keyfilter/importdoc';
import { KeyFilterDocModule } from '@/doc/keyfilter/keyfilterdoc.module';
import { PresetsDoc } from '@/doc/keyfilter/presetsdoc';
import { ReactiveFormsDoc } from '@/doc/keyfilter/reactiveformsdoc';
import { RegexDoc } from '@/doc/keyfilter/regexdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular KeyFilter Component"
        header="KeyFilter"
        description="KeyFilter is a directive to restrict individual key strokes. In order to restrict the whole input, use InputNumber or InputMask instead."
        [docs]="docs"
        [apiDocs]="['KeyFilter']"
    ></app-doc>`,
    standalone: true,
    imports: [KeyFilterDocModule]
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
