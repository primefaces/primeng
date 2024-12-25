import { AccessibilityDoc } from '@/doc/inputgroup/accessibilitydoc';
import { BasicDoc } from '@/doc/inputgroup/basicdoc';
import { ButtonDoc } from '@/doc/inputgroup/buttondoc';
import { CheckboxDoc } from '@/doc/inputgroup/checkboxdoc';
import { FloatLabelDoc } from '@/doc/inputgroup/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/inputgroup/iftalabeldoc';
import { ImportDoc } from '@/doc/inputgroup/importdoc';
import { InputGroupDocModule } from '@/doc/inputgroup/inputgroupddoc.module';
import { MultipleDoc } from '@/doc/inputgroup/multipledoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular InputGroup Component" header="InputGroup" description="Text, icon, buttons and other content can be grouped next to an input." [docs]="docs" themeDocs="inputgroup"></app-doc> `,
    standalone: true,
    imports: [InputGroupDocModule]
})
export class InputGroupDemo {
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
