import { AccessibilityDoc } from '@/doc/keyfilter/accessibilitydoc';
import { ImportDoc } from '@/doc/keyfilter/importdoc';
import { PresetsDoc } from '@/doc/keyfilter/presetsdoc';
import { RegexDoc } from '@/doc/keyfilter/regexdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular KeyFilter Component"
        header="KeyFilter"
        description="KeyFilter is a directive to restrict individual key strokes. In order to restrict the whole input, use InputNumber or InputMask instead."
        [docs]="docs"
        [apiDocs]="['KeyFilter']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
