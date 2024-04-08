import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/treeselect/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/treeselect/accessibilitydoc';
import { BasicDoc } from '@doc/treeselect/basicdoc';
import { CheckboxDoc } from '@doc/treeselect/checkboxdoc';
import { DisabledDoc } from '@doc/treeselect/disableddoc';
import { FilterDoc } from '@doc/treeselect/filterdoc';
import { FloatLabelDoc } from '@doc/treeselect/floatlabeldoc';
import { ImportDoc } from '@doc/treeselect/importdoc';
import { InvalidDoc } from '@doc/treeselect/invaliddoc';
import { MultipleDoc } from '@doc/treeselect/multipledoc';
import { StyleDoc } from '@doc/treeselect/styledoc';
import { VirtualScrollDoc } from '@doc/treeselect/virtualscrolldoc';
import { FilledDoc } from '@doc/treeselect/filleddoc';

@Component({
    templateUrl: './treeselectdemo.html'
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
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
