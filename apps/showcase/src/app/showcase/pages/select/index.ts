import { Component } from '@angular/core';
import { BasicDoc } from '@doc/select/basicdoc';
import { DisabledDoc } from '@doc/select/disableddoc';
import { EditableDoc } from '@doc/select/editabledoc';
import { FilterDoc } from '@doc/select/filterdoc';
import { GroupDoc } from '@doc/select/groupdoc';
import { ImportDoc } from '@doc/select/importdoc';
import { TemplateDoc } from '@doc/select/templatedoc';
import { VirtualScrollDoc } from '@doc/select/virtualscrolldoc';
import { FloatLabelDoc } from '@doc/select/floatlabeldoc';
import { AccessibilityDoc } from '@doc/select/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/select/reactiveformsdoc';
import { LazyVirtualScrollDoc } from '@doc/select/lazyvirtualscrolldoc';
import { InvalidDoc } from '@doc/select/invaliddoc';
import { CustomFilterDoc } from '@doc/select/customfilterdoc';
import { CheckmarkDoc } from '@doc/select/checkmarkdoc';
import { ClearIconDoc } from '@doc/select/clearicondoc';
import { LoadingStateDoc } from '@doc/select/loadingstatedoc';
import { FilledDoc } from '@doc/select/filleddoc';
import { SelectDocModule } from '@doc/select/selectdoc.module';
import { IftaLabelDoc } from '@doc/select/iftalabeldoc';
import { SizesDoc } from '@doc/select/sizesdoc';

@Component({
    template: `<app-doc docTitle="Angular Select Component" header="Select" description="Select is used to choose an item from a collection of options." [docs]="docs" [apiDocs]="['Select']" themeDocs="select"></app-doc> `,
    standalone: true,
    imports: [SelectDocModule],
    styleUrl: './selectdemo.scss'
})
export class SelectDemo {
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
            id: 'clearicon',
            label: 'Clear Icon',
            component: ClearIconDoc
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
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
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
