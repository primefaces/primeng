import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/autocomplete/accessibility-doc';
import { AdvancedChipsDoc } from '@/doc/autocomplete/advanced-chips-doc';
import { BasicChipsDoc } from '@/doc/autocomplete/basic-chips-doc';
import { BasicDoc } from '@/doc/autocomplete/basic-doc';
import { ClearIconDoc } from '@/doc/autocomplete/clear-icon-doc';
import { DisabledDoc } from '@/doc/autocomplete/disabled-doc';
import { DropdownDoc } from '@/doc/autocomplete/dropdown-doc';
import { FilledDoc } from '@/doc/autocomplete/filled-doc';
import { FloatLabelDoc } from '@/doc/autocomplete/float-label-doc';
import { FluidDoc } from '@/doc/autocomplete/fluid-doc';
import { ForceSelectionDoc } from '@/doc/autocomplete/force-selection-doc';
import { GroupDoc } from '@/doc/autocomplete/group-doc';
import { IftaLabelDoc } from '@/doc/autocomplete/ifta-label-doc';
import { ImportDoc } from '@/doc/autocomplete/import-doc';
import { InvalidDoc } from '@/doc/autocomplete/invalid-doc';
import { MultipleDoc } from '@/doc/autocomplete/multiple-doc';
import { ObjectsDoc } from '@/doc/autocomplete/objects-doc';
import { PTComponent } from '@/doc/autocomplete/pt/PTComponent';
import { ReactiveFormsDoc } from '@/doc/autocomplete/reactive-forms-doc';
import { SizesDoc } from '@/doc/autocomplete/sizes-doc';
import { TemplateDoc } from '@/doc/autocomplete/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/autocomplete/template-driven-forms-doc';
import { VirtualScrollDoc } from '@/doc/autocomplete/virtual-scroll-doc';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular AutoComplete Component"
        header="AutoComplete"
        description="AutoComplete is an input component that provides real-time suggestions when being typed."
        [docs]="docs"
        [apiDocs]="['AutoComplete']"
        [ptDocs]="ptComponent"
        themeDocs="AutoComplete"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteDemo {
    ptComponent = PTComponent;

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
            id: 'dropdown',
            label: 'Dropdown',
            component: DropdownDoc
        },
        {
            id: 'objects',
            label: 'Objects',
            component: ObjectsDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
        },
        {
            id: 'forceselection',
            label: 'Force Selection',
            component: ForceSelectionDoc
        },
        {
            id: 'virtualscroll',
            label: 'Virtual Scroll',
            component: VirtualScrollDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'chips',
            label: 'Chips',
            children: [
                {
                    id: 'basicchips',
                    label: 'Basic',
                    component: BasicChipsDoc
                },
                {
                    id: 'advancedchips',
                    label: 'Advanced',
                    component: AdvancedChipsDoc
                }
            ]
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
            id: 'clearicon',
            label: 'Clear Icon',
            component: ClearIconDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
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
