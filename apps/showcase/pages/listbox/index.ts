import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/listbox/accessibilitydoc';
import { BasicDoc } from '@/doc/listbox/basicdoc';
import { CheckboxDoc } from '@/doc/listbox/checkboxdoc';
import { CheckmarkDoc } from '@/doc/listbox/checkmarkdoc';
import { DisabledDoc } from '@/doc/listbox/disableddoc';
import { DragDropDoc } from '@/doc/listbox/dragdropdoc';
import { FilterDoc } from '@/doc/listbox/filterdoc';
import { GroupDoc } from '@/doc/listbox/groupdoc';
import { ImportDoc } from '@/doc/listbox/importdoc';
import { InvalidDoc } from '@/doc/listbox/invaliddoc';
import { MultipleDoc } from '@/doc/listbox/multipledoc';
import { ReactiveFormsDoc } from '@/doc/listbox/reactiveformsdoc';
import { TemplateDoc } from '@/doc/listbox/templatedoc';
import { TemplateDrivenFormsDoc } from '@/doc/listbox/templatedrivenformsdoc';
import { VirtualScrollDoc } from '@/doc/listbox/virtualscrolldoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Listbox Component" header="Listbox" description="Listbox is used to select one or more values from a list of items." [docs]="docs" [apiDocs]="['Listbox']" themeDocs="listbox"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class ListboxDemo {
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
            id: 'checkmark',
            label: 'Checkmark',
            component: CheckmarkDoc
        },
        {
            id: 'checkbox',
            label: 'Checkbox',
            component: CheckboxDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'virtualscroll',
            label: 'Virtual Scroll',
            component: VirtualScrollDoc
        },
        {
            id: 'drag-drop',
            label: 'Drag & Drop',
            component: DragDropDoc
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
