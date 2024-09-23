import { Component } from '@angular/core';
import { MultipleDoc } from '@doc/inputgroup/multipledoc';
import { BasicDoc } from '@doc/inputgroup/basicdoc';
import { ImportDoc } from '@doc/inputgroup/importdoc';
import { ButtonDoc } from '@doc/inputgroup/buttondoc';
import { CheckboxDoc } from '@doc/inputgroup/checkboxdoc';
import { AccessibilityDoc } from '@doc/inputgroup/accessibilitydoc';
import { InputGroupDocModule } from '@doc/inputgroup/inputgroupddoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular InputGroup Component"
        header="InputGroup"
        description="Text, icon, buttons and other content can be grouped next to an input."
        [docs]="docs"
        themeDocs="inputgroup"
    ></app-doc> `,
    standalone: true,
    imports: [InputGroupDocModule],
})
export class InputGroupDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc,
        },
        {
            id: 'button',
            label: 'Button',
            component: ButtonDoc,
        },
        {
            id: 'checkbox',
            label: 'Checkbox & Radio',
            component: CheckboxDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
