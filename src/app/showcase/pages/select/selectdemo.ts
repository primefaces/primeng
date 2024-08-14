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
import { StyleDoc } from '@doc/select/styledoc';
import { AccessibilityDoc } from '@doc/select/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/select/reactiveformsdoc';
import { LazyVirtualScrollDoc } from '@doc/select/lazyvirtualscrolldoc';
import { InvalidDoc } from '@doc/select/invaliddoc';
import { CustomFilterDoc } from '@doc/select/customfilterdoc';
import { CheckmarkDoc } from '@doc/select/checkmarkdoc';
import { ClearIconDoc } from '@doc/select/clearicondoc';
import { LoadingStateDoc } from '@doc/select/loadingstatedoc';
import { FilledDoc } from '@doc/select/filleddoc';

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
