import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/inputgroup/accessibility-doc';
import { BasicDoc } from '@/doc/inputgroup/basic-doc';
import { ButtonDoc } from '@/doc/inputgroup/button-doc';
import { CheckboxDoc } from '@/doc/inputgroup/checkbox-doc';
import { FloatLabelDoc } from '@/doc/inputgroup/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/inputgroup/iftalabel-doc';
import { ImportDoc } from '@/doc/inputgroup/import-doc';
import { MultipleDoc } from '@/doc/inputgroup/multiple-doc';
import { PTComponent } from '@/doc/inputgroup/pt/PTComponent';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular InputGroup Component" header="InputGroup" description="Text, icon, buttons and other content can be grouped next to an input." [docs]="docs" [ptDocs]="ptComponent" themeDocs="inputgroup"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class InputGroupDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'button',
            label: 'Button',
            component: ButtonDoc
        },
        {
            id: 'checkbox',
            label: 'Checkbox & Radio',
            component: CheckboxDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
