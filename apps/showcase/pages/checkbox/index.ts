import { AccessibilityDoc } from '@/doc/checkbox/accessibilitydoc';
import { BasicDoc } from '@/doc/checkbox/basicdoc';
import { CheckboxDocModule } from '@/doc/checkbox/checkboxdoc.module';
import { DisabledDoc } from '@/doc/checkbox/disableddoc';
import { DynamicDoc } from '@/doc/checkbox/dynamicdoc';
import { FilledDoc } from '@/doc/checkbox/filleddoc';
import { ImportDoc } from '@/doc/checkbox/importdoc';
import { IndeterminateDoc } from '@/doc/checkbox/indeterminatedoc';
import { InvalidDoc } from '@/doc/checkbox/invaliddoc';
import { MultipleDoc } from '@/doc/checkbox/multipledoc';
import { ReactiveFormsDoc } from '@/doc/checkbox/reactiveformsdoc';
import { SizesDoc } from '@/doc/checkbox/sizesdoc';
import { TemplateDrivenFormsDoc } from '@/doc/checkbox/templatedrivenformsdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CheckboxDocModule],
    template: ` <app-doc docTitle="Angular Checkbox Component" header="Checkbox" description="Checkbox is an extension to standard checkbox element with theming." [docs]="docs" [apiDocs]="['Checkbox']" themeDocs="checkbox"></app-doc> `
})
export class CheckboxDemo {
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
            id: 'indeterminate',
            label: 'Indeterminate',
            component: IndeterminateDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: MultipleDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
