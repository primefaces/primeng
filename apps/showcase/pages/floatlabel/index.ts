import { AccessibilityDoc } from '@/doc/floatlabel/accessibilitydoc';
import { BasicDoc } from '@/doc/floatlabel/basicdoc';
import { FloatLabelDocModule } from '@/doc/floatlabel/floatlabeldoc.module';
import { ImportDoc } from '@/doc/floatlabel/importdoc';
import { InvalidDoc } from '@/doc/floatlabel/invaliddoc';
import { VariantsDoc } from '@/doc/floatlabel/variantsdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [FloatLabelDocModule],
    template: ` <app-doc docTitle="Angular Float Label Component" header="FloatLabel" description="FloatLabel appears on top of the input field when focused." [docs]="docs" themeDocs="floatlabel"></app-doc> `
})
export class FloatLabelDemo {
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
            id: 'variants',
            label: 'Variants',
            component: VariantsDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
