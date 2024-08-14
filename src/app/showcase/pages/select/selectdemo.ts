import { Component } from '@angular/core';
import { BasicDoc } from '@doc/dropdown/basicdoc';
import { DisabledDoc } from '@doc/dropdown/disableddoc';
import { EditableDoc } from '@doc/dropdown/editabledoc';
import { FilterDoc } from '@doc/dropdown/filterdoc';
import { GroupDoc } from '@doc/dropdown/groupdoc';
import { ImportDoc } from '@doc/dropdown/importdoc';
import { TemplateDoc } from '@doc/dropdown/templatedoc';
import { VirtualScrollDoc } from '@doc/dropdown/virtualscrolldoc';
import { FloatLabelDoc } from '@doc/dropdown/floatlabeldoc';
import { StyleDoc } from '@doc/dropdown/styledoc';
import { AccessibilityDoc } from '@doc/dropdown/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/dropdown/reactiveformsdoc';
import { LazyVirtualScrollDoc } from '@doc/dropdown/lazyvirtualscrolldoc';
import { InvalidDoc } from '@doc/dropdown/invaliddoc';
import { CustomFilterDoc } from '@doc/dropdown/customfilterdoc';
import { CheckmarkDoc } from '@doc/dropdown/checkmarkdoc';
import { ClearIconDoc } from '@doc/dropdown/clearicondoc';
import { LoadingStateDoc } from '@doc/dropdown/loadingstatedoc';
import { FilledDoc } from '@doc/dropdown/filleddoc';

@Component({
    templateUrl: './selectdemo.html',
    styleUrls: ['./selectdemo.scss']
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
            children: [
                {
                    id: 'filterbasic',
                    label: 'Basic',
                    component: FilterDoc
                },
                {
                    id: 'customfilter',
                    label: 'Custom Filter',
                    component: CustomFilterDoc
                }
            ]
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
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
