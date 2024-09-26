import { Component } from '@angular/core';
import { ImportDoc } from '@doc/floatlabel/importdoc';
import { BasicDoc } from '@doc/floatlabel/basicdoc';
import { AccessibilityDoc } from '@doc/floatlabel/accessibilitydoc';
import { FloatLabelDocModule } from '@doc/floatlabel/floatlabeldoc.module';
import { VariantsDoc } from '@doc/floatlabel/variantsdoc';
import { InvalidDoc } from '@doc/floatlabel/invaliddoc';

@Component({
    standalone: true,
    imports: [FloatLabelDocModule],
    template: `
        <app-doc
            docTitle="Angular Float Label Component"
            header="FloatLabel"
            description="FloatLabel appears on top of the input field when focused."
            [docs]="docs"
            themeDocs="floatlabel"
        ></app-doc>
    `,
})
export class FloatLabelDemo {
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
            id: 'variants',
            label: 'Variants',
            component: VariantsDoc,
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
