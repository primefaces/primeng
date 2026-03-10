import { AccessibilityDoc } from '@/doc/keyfilter/accessibility-doc';
import { PresetsDoc } from '@/doc/keyfilter/presets-doc';
import { RegexDoc } from '@/doc/keyfilter/regex-doc';
import { UsageDoc } from '@/doc/keyfilter/usage-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular KeyFilter Component"
        header="KeyFilter"
        description="KeyFilter is a directive to restrict individual key strokes. In order to restrict the whole input, use InputNumber or InputMask instead."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['KeyFilter']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class KeyFilterDemo {
    heroDoc = PresetsDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'presets',
                    label: 'Presets',
                    component: PresetsDoc
                },
                {
                    id: 'regex',
                    label: 'Regex',
                    component: RegexDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
