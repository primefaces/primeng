import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicDoc } from '@doc/autocomplete/basicdoc';
import { ImportDoc } from '@doc/autocomplete/importdoc';
import { AutoCompleteDocModule } from '@doc/autocomplete/autocompletedoc.module';
import { ReactiveFormsDoc } from '@doc/autocomplete/reactiveformsdoc';
import { DropdownDoc } from '@doc/autocomplete/dropdowndoc';
import { ObjectsDoc } from '@doc/autocomplete/objectsdoc';
import { TemplateDoc } from '@doc/autocomplete/templatedoc';
import { GroupDoc } from '@doc/autocomplete/groupdoc';
import { ForceSelectionDoc } from '@doc/autocomplete/forceselectiondoc';
import { VirtualScrollDoc } from '@doc/autocomplete/virtualscrolldoc';
import { MultipleDoc } from '@doc/autocomplete/multipledoc';
import { FloatLabelDoc } from '@doc/autocomplete/floatlabeldoc';
import { FilledDoc } from '@doc/autocomplete/filleddoc';
import { DisabledDoc } from '@doc/autocomplete/disableddoc';
import { InvalidDoc } from '@doc/autocomplete/invaliddoc';
import { AccessibilityDoc } from '@doc/autocomplete/accessibilitydoc';
import { IftaLabelDoc } from '@doc/autocomplete/iftalabeldoc';
import { SizesDoc } from '@doc/autocomplete/sizesdoc';

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
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'dropdown',
            label: 'Dropdown',
            component: DropdownDoc,
        },
        {
            id: 'objects',
            label: 'Objects',
            component: ObjectsDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc,
        },
        {
            id: 'forceselection',
            label: 'Force Selection',
            component: ForceSelectionDoc,
        },
        {
            id: 'virtualscroll',
            label: 'Virtual Scroll',
            component: VirtualScrollDoc,
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc,
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc,
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc,
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc,
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc,
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
