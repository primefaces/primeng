import { Component } from '@angular/core';
import { LabelDoc } from '../../doc/checkbox/labeldoc';
import { BasicDoc } from '../../doc/checkbox/basicdoc';
import { ImportDoc } from '../../doc/checkbox/importdoc';
import { MultipleDoc } from '../../doc/checkbox/multipledoc';
import { DynamicDoc } from '../../doc/checkbox/dynamicdoc';
import { DisabledDoc } from '../../doc/checkbox/disableddoc';
import { StyleDoc } from '../../doc/checkbox/styledoc';
import { PropsDoc } from '../../doc/checkbox/propsdoc';

@Component({
    templateUrl: './checkboxdemo.html'
})
export class CheckboxDemo {
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
            id: 'group',
            label: 'Group',
            component: MultipleDoc
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
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
        }
    ];

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        }
    ];
}
