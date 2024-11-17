import { AccessibilityDoc } from '@/doc/togglebutton/accessibilitydoc';
import { BasicDoc } from '@/doc/togglebutton/basicdoc';
import { CustomizedDoc } from '@/doc/togglebutton/customizeddoc';
import { DisabledDoc } from '@/doc/togglebutton/disableddoc';
import { ImportDoc } from '@/doc/togglebutton/importdoc';
import { InvalidDoc } from '@/doc/togglebutton/invaliddoc';
import { ReactiveFormsDoc } from '@/doc/togglebutton/reactiveformsdoc';
import { SizesDoc } from '@/doc/togglebutton/sizesdoc';
import { ToggleButtonDocModule } from '@/doc/togglebutton/togglebuttondoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular ToggleButton Component" header="ToggleButton" description="ToggleButton is used to select a boolean value using a button." [docs]="docs" [apiDocs]="['ToggleButton']" themeDocs="togglebutton"></app-doc>`,
    standalone: true,
    imports: [ToggleButtonDocModule]
})
export class ToggleButtonDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'customized',
            label: 'Customized',
            component: CustomizedDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
