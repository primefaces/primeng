import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/multiselect/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/multiselect/accessibilitydoc';
import { BasicDoc } from '@doc/multiselect/basicdoc';
import { ChipsDoc } from '@doc/multiselect/chipsdoc';
import { DisabledDoc } from '@doc/multiselect/disableddoc';
import { FilterDoc } from '@doc/multiselect/filterdoc';
import { FloatLabelDoc } from '@doc/multiselect/floatlabeldoc';
import { GroupDoc } from '@doc/multiselect/groupdoc';
import { ImportDoc } from '@doc/multiselect/importdoc';
import { InvalidDoc } from '@doc/multiselect/invaliddoc';
import { StyleDoc } from '@doc/multiselect/styledoc';
import { TemplateDoc } from '@doc/multiselect/templatedoc';
import { VirtualScrollDoc } from '@doc/multiselect/virtualscrolldoc';
import { LoadingStateDoc } from '@doc/multiselect/loadingstatedoc';
import { FilledDoc } from '@doc/multiselect/filleddoc';

@Component({
    templateUrl: './multiselectdemo.html',
    styleUrls: ['./multiselectdemo.scss']
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
