import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/dropdown/basicdoc';
import { DisabledDoc } from '../../doc/dropdown/disableddoc';
import { EditableDoc } from '../../doc/dropdown/editabledoc';
import { FilterDoc } from '../../doc/dropdown/filterdoc';
import { GroupDoc } from '../../doc/dropdown/groupdoc';
import { ImportDoc } from '../../doc/dropdown/importdoc';
import { TemplateDoc } from '../../doc/dropdown/templatedoc';
import { VirtualScrollDoc } from '../../doc/dropdown/virtualscrolldoc';
import { FloatLabelDoc } from '../../doc/dropdown/floatlabeldoc';
import { StyleDoc } from '../../doc/dropdown/styledoc';
import { AccessibilityDoc } from '../../doc/dropdown/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/dropdown/reactiveformsdoc';
import { LazyVirtualScrollDoc } from '../../doc/dropdown/lazyvirtualscrolldoc';
import { InvalidDoc } from '../../doc/dropdown/invaliddoc';

@Component({
    templateUrl: './dropdowndemo.html',
    styleUrls: ['./dropdowndemo.scss']
})
export class DropdownDemo {
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
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
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
