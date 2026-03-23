import { AccessibilityDoc } from '@/doc/treeselect/accessibility-doc';
import { BasicDoc } from '@/doc/treeselect/basic-doc';
import { CheckboxDoc } from '@/doc/treeselect/checkbox-doc';
import { DisabledDoc } from '@/doc/treeselect/disabled-doc';
import { FilledDoc } from '@/doc/treeselect/filled-doc';
import { FilterDoc } from '@/doc/treeselect/filter-doc';
import { FloatLabelDoc } from '@/doc/treeselect/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/treeselect/iftalabel-doc';
import { ImportDoc } from '@/doc/treeselect/import-doc';
import { InvalidDoc } from '@/doc/treeselect/invalid-doc';
import { LazyDoc } from '@/doc/treeselect/lazy-doc';
import { MultipleDoc } from '@/doc/treeselect/multiple-doc';
import { ReactiveFormsDoc } from '@/doc/treeselect/reactiveforms-doc';
import { SizesDoc } from '@/doc/treeselect/sizes-doc';
import { TemplateDoc } from '@/doc/treeselect/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/treeselect/templatedrivenforms-doc';
import { VirtualScrollDoc } from '@/doc/treeselect/virtualscroll-doc';
import { FluidDoc } from '@/doc/treeselect/fluid-doc';
import { ClearIconDoc } from '@/doc/treeselect/clearicon-doc';
import { PTComponent } from '@/doc/treeselect/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular TreeSelect Component"
        header="TreeSelect"
        description="TreeSelect is a form component to choose from hierarchical data."
        [docs]="docs"
        [apiDocs]="['TreeSelect', 'TreeNode']"
        [ptDocs]="ptComponent"
        themeDocs="treeselect"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class TreeSelectDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'checkbox',
            label: 'Checkbox',
            component: CheckboxDoc
        },
        {
            id: 'virtual-scroll-doc',
            label: 'Virtual Scroll',
            component: VirtualScrollDoc
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyDoc
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
