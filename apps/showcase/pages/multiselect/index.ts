import { AccessibilityDoc } from '@/doc/multiselect/accessibilitydoc';
import { BasicDoc } from '@/doc/multiselect/basicdoc';
import { ChipsDoc } from '@/doc/multiselect/chipsdoc';
import { DisabledDoc } from '@/doc/multiselect/disableddoc';
import { FilledDoc } from '@/doc/multiselect/filleddoc';
import { FilterDoc } from '@/doc/multiselect/filterdoc';
import { FloatLabelDoc } from '@/doc/multiselect/floatlabeldoc';
import { GroupDoc } from '@/doc/multiselect/groupdoc';
import { IftaLabelDoc } from '@/doc/multiselect/iftalabeldoc';
import { ImportDoc } from '@/doc/multiselect/importdoc';
import { InvalidDoc } from '@/doc/multiselect/invaliddoc';
import { LoadingStateDoc } from '@/doc/multiselect/loadingstatedoc';
import { MultiSelectDocModule } from '@/doc/multiselect/multiselectdoc.module';
import { ReactiveFormsDoc } from '@/doc/multiselect/reactiveformsdoc';
import { SizesDoc } from '@/doc/multiselect/sizesdoc';
import { TemplateDoc } from '@/doc/multiselect/templatedoc';
import { VirtualScrollDoc } from '@/doc/multiselect/virtualscrolldoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular MultiSelect Component" header="MultiSelect" description="MultiSelect is used to select multiple items from a collection." [docs]="docs" [apiDocs]="['MultiSelect']" themeDocs="multiselect"></app-doc> `,
    standalone: true,
    imports: [MultiSelectDocModule]
})
export class MultiSelectDemo {
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
