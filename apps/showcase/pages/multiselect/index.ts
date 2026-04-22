import { AccessibilityDoc } from '@/doc/multiselect/accessibility-doc';
import { BasicDoc } from '@/doc/multiselect/basic-doc';
import { ChipsDoc } from '@/doc/multiselect/chips-doc';
import { DisabledDoc } from '@/doc/multiselect/disabled-doc';
import { FilledDoc } from '@/doc/multiselect/filled-doc';
import { FilterDoc } from '@/doc/multiselect/filter-doc';
import { FloatLabelDoc } from '@/doc/multiselect/floatlabel-doc';
import { GroupDoc } from '@/doc/multiselect/group-doc';
import { IftaLabelDoc } from '@/doc/multiselect/iftalabel-doc';
import { ImportDoc } from '@/doc/multiselect/import-doc';
import { InvalidDoc } from '@/doc/multiselect/invalid-doc';
import { LoadingStateDoc } from '@/doc/multiselect/loadingstate-doc';
import { ReactiveFormsDoc } from '@/doc/multiselect/reactiveforms-doc';
import { SizesDoc } from '@/doc/multiselect/sizes-doc';
import { TemplateDoc } from '@/doc/multiselect/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/multiselect/templatedrivenforms-doc';
import { VirtualScrollDoc } from '@/doc/multiselect/virtualscroll-doc';
import { ClearIconDoc } from '@/doc/multiselect/clearicon-doc';
import { FluidDoc } from '@/doc/multiselect/fluid-doc';
import { PTComponent } from '@/doc/multiselect/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular MultiSelect Component"
        header="MultiSelect"
        description="MultiSelect is used to select multiple items from a collection."
        [docs]="docs"
        [apiDocs]="['MultiSelect']"
        [ptDocs]="ptComponent"
        themeDocs="multiselect"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class MultiSelectDemo {
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
            id: 'chips',
            label: 'Chips',
            component: ChipsDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'loadingstate',
            label: 'Loading State',
            component: LoadingStateDoc
        },
        {
            id: 'virtualscroll',
            label: 'VirtualScroll',
            component: VirtualScrollDoc
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
