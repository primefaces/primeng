import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/listbox/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/listbox/accessibilitydoc';
import { BasicDoc } from '@doc/listbox/basicdoc';
import { DisabledDoc } from '@doc/listbox/disableddoc';
import { FilterDoc } from '@doc/listbox/filterdoc';
import { GroupDoc } from '@doc/listbox/groupdoc';
import { ImportDoc } from '@doc/listbox/importdoc';
import { InvalidDoc } from '@doc/listbox/invaliddoc';
import { MultipleDoc } from '@doc/listbox/multipledoc';
import { TemplateDoc } from '@doc/listbox/templatedoc';
import { VirtualScrollDoc } from '@doc/listbox/virtualscrolldoc';
import { ListboxDocModule } from '@doc/listbox/listboxdoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Listbox Component"
        header="Listbox"
        description="Listbox is used to select one or more values from a list of items."
        [docs]="docs"
        [apiDocs]="['Listbox']"
        themeDocs="listbox"
    ></app-doc> `,
    standalone: true,
    imports: [ListboxDocModule],
})
export class ListboxDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc,
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc,
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'virtualscroll',
            label: 'Virtual Scroll',
            component: VirtualScrollDoc,
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc,
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
