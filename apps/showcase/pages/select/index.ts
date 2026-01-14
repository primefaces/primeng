import { AccessibilityDoc } from '@/doc/select/accessibility-doc';
import { BasicDoc } from '@/doc/select/basic-doc';
import { CheckmarkDoc } from '@/doc/select/checkmark-doc';
import { ClearIconDoc } from '@/doc/select/clearicon-doc';
import { DisabledDoc } from '@/doc/select/disabled-doc';
import { EditableDoc } from '@/doc/select/editable-doc';
import { FilledDoc } from '@/doc/select/filled-doc';
import { FilterDoc } from '@/doc/select/filter-doc';
import { FloatLabelDoc } from '@/doc/select/floatlabel-doc';
import { FluidDoc } from '@/doc/select/fluid-doc';
import { GroupDoc } from '@/doc/select/group-doc';
import { IftaLabelDoc } from '@/doc/select/iftalabel-doc';
import { ImportDoc } from '@/doc/select/import-doc';
import { InvalidDoc } from '@/doc/select/invalid-doc';
import { LazyVirtualScrollDoc } from '@/doc/select/lazyvirtualscroll-doc';
import { LoadingStateDoc } from '@/doc/select/loadingstate-doc';
import { PTComponent } from '@/doc/select/pt/PTComponent';
import { ReactiveFormsDoc } from '@/doc/select/reactiveforms-doc';
import { SizesDoc } from '@/doc/select/sizes-doc';
import { TemplateDoc } from '@/doc/select/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/select/templatedrivenforms-doc';
import { VirtualScrollDoc } from '@/doc/select/virtualscroll-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Select Component" header="Select" description="Select is used to choose an item from a collection of options." [docs]="docs" [apiDocs]="['Select']" [ptDocs]="ptComponent" themeDocs="select"></app-doc> `,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './selectdemo.scss'
})
export class SelectDemo {
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
            id: 'checkmark',
            label: 'Checkmark',
            component: CheckmarkDoc
        },
        {
            id: 'editable',
            label: 'Editable',
            component: EditableDoc
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
            label: 'Virtual Scroll',
            component: VirtualScrollDoc
        },
        {
            id: 'lazyvirtualscroll',
            label: 'Lazy Virtual Scroll',
            component: LazyVirtualScrollDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
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
