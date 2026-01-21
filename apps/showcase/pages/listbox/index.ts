import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/listbox/accessibility-doc';
import { BasicDoc } from '@/doc/listbox/basic-doc';
import { CheckboxDoc } from '@/doc/listbox/checkbox-doc';
import { CheckmarkDoc } from '@/doc/listbox/checkmark-doc';
import { DisabledDoc } from '@/doc/listbox/disabled-doc';
import { DragDropDoc } from '@/doc/listbox/dragdrop-doc';
import { FilterDoc } from '@/doc/listbox/filter-doc';
import { GroupDoc } from '@/doc/listbox/group-doc';
import { ImportDoc } from '@/doc/listbox/import-doc';
import { InvalidDoc } from '@/doc/listbox/invalid-doc';
import { MultipleDoc } from '@/doc/listbox/multiple-doc';
import { PTComponent } from '@/doc/listbox/pt/PTComponent';
import { ReactiveFormsDoc } from '@/doc/listbox/reactiveforms-doc';
import { TemplateDoc } from '@/doc/listbox/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/listbox/templatedrivenforms-doc';
import { VirtualScrollDoc } from '@/doc/listbox/virtualscroll-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Listbox Component"
        header="Listbox"
        description="Listbox is used to select one or more values from a list of items."
        [docs]="docs"
        [apiDocs]="['Listbox']"
        themeDocs="listbox"
        [ptDocs]="ptComponent"
    ></app-doc> `,
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

    ptComponent = PTComponent;
}
