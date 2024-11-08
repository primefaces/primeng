import { Component } from '@angular/core';
import { BasicDoc } from '@doc/checkbox/basicdoc';
import { ImportDoc } from '@doc/checkbox/importdoc';
import { MultipleDoc } from '@doc/checkbox/multipledoc';
import { DynamicDoc } from '@doc/checkbox/dynamicdoc';
import { DisabledDoc } from '@doc/checkbox/disableddoc';
import { InvalidDoc } from '@doc/checkbox/invaliddoc';
import { AccessibilityDoc } from '@doc/checkbox/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/checkbox/reactiveformsdoc';
import { FilledDoc } from '@doc/checkbox/filleddoc';
import { IndeterminateDoc } from '@doc/checkbox/indeterminatedoc';
import { CheckboxDocModule } from '@doc/checkbox/checkboxdoc.module';
import { SizesDoc } from '@doc/checkbox/sizesdoc';

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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
