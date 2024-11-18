import { AccessibilityDoc } from '@/doc/treeselect/accessibilitydoc';
import { BasicDoc } from '@/doc/treeselect/basicdoc';
import { CheckboxDoc } from '@/doc/treeselect/checkboxdoc';
import { DisabledDoc } from '@/doc/treeselect/disableddoc';
import { FilledDoc } from '@/doc/treeselect/filleddoc';
import { FilterDoc } from '@/doc/treeselect/filterdoc';
import { FloatLabelDoc } from '@/doc/treeselect/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/treeselect/iftalabeldoc';
import { ImportDoc } from '@/doc/treeselect/importdoc';
import { InvalidDoc } from '@/doc/treeselect/invaliddoc';
import { LazyDoc } from '@/doc/treeselect/lazydoc';
import { MultipleDoc } from '@/doc/treeselect/multipledoc';
import { ReactiveFormsDoc } from '@/doc/treeselect/reactiveformsdoc';
import { SizesDoc } from '@/doc/treeselect/sizesdoc';
import { TemplateDoc } from '@/doc/treeselect/templatedoc';
import { TreeSelectDocModule } from '@/doc/treeselect/treeselectdoc.module';
import { VirtualScrollDoc } from '@/doc/treeselect/virtualscrolldoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular TreeSelect Component"
        header="TreeSelect"
        description="TreeSelect is a form component to choose from hierarchical data."
        [docs]="docs"
        [apiDocs]="['TreeSelect', 'TreeNode']"
        themeDocs="treeselect"
    ></app-doc>`,
    standalone: true,
    imports: [TreeSelectDocModule]
})
export class TreeSelectDemo {
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
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
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
