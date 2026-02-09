import { AccessibilityDoc } from '@/doc/floatlabel/accessibility-doc';
import { BasicDoc } from '@/doc/floatlabel/basic-doc';
import { ImportDoc } from '@/doc/floatlabel/import-doc';
import { InvalidDoc } from '@/doc/floatlabel/invalid-doc';
import { VariantsDoc } from '@/doc/floatlabel/variants-doc';
import { PTComponent } from '@/doc/floatlabel/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Float Label Component" header="FloatLabel" description="FloatLabel appears on top of the input field when focused." [docs]="docs" [ptDocs]="ptComponent" themeDocs="floatlabel" [apiDocs]="['FloatLabel']"></app-doc>
    `
})
export class FloatLabelDemo {
    ptComponent = PTComponent;
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
