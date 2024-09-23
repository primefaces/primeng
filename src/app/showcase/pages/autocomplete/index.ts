import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicDoc } from '@doc/autocomplete/basicdoc';
import { ImportDoc } from '@doc/autocomplete/importdoc';
import { AutoCompleteDocModule } from '@doc/autocomplete/autocompletedoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular AutoComplete Component"
        header="AutoComplete"
        description="AutoComplete is an input component that provides real-time suggestions when being typed."
        [docs]="docs"
        [apiDocs]="['AutoComplete']"
        themeDocs="AutoComplete"
    ></app-doc>`,
    standalone: true,
    imports: [AutoCompleteDocModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDemo {
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
        // {
        //     id: 'reactive-forms',
        //     label: 'Reactive Forms',
        //     component: ReactiveFormsDoc,
        // },
        // {
        //     id: 'dropdown',
        //     label: 'Dropdown',
        //     component: DropdownDoc,
        // },
        // {
        //     id: 'objects',
        //     label: 'Objects',
        //     component: ObjectsDoc,
        // },
        // {
        //     id: 'template',
        //     label: 'Template',
        //     component: TemplateDoc,
        // },
        // {
        //     id: 'group',
        //     label: 'Group',
        //     component: GroupDoc,
        // },
        // {
        //     id: 'forceselection',
        //     label: 'Force Selection',
        //     component: ForceSelectionDoc,
        // },
        // {
        //     id: 'virtualscroll',
        //     label: 'Virtual Scroll',
        //     component: VirtualScrollDoc,
        // },
        // {
        //     id: 'multiple',
        //     label: 'Multiple',
        //     component: MultipleDoc,
        // },
        // {
        //     id: 'floatlabel',
        //     label: 'Float Label',
        //     component: FloatLabelDoc,
        // },
        // {
        //     id: 'filled',
        //     label: 'Filled',
        //     component: FilledDoc,
        // },
        // {
        //     id: 'disabled',
        //     label: 'Disabled',
        //     component: DisabledDoc,
        // },
        // {
        //     id: 'invalid',
        //     label: 'Invalid',
        //     component: InvalidDoc,
        // },
        //
        // {
        //     id: 'accessibility',
        //     label: 'Accessibility',
        //     component: AccessibilityDoc,
        // },
    ];
}
