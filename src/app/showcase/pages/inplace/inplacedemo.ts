import { Component } from '@angular/core';
import { EventsDoc } from '../../doc/inplace/eventsdoc';
import { InplaceImageDemo } from '../../doc/inplace/imagedoc';
import { PropsDoc } from '../../doc/inplace/propsdoc';
import { StyleDoc } from '../../doc/inplace/styledoc';
import { InplaceBasicDemo } from '../../doc/inplace/basicdoc';
import { InplaceDataDemo } from '../../doc/inplace/datadoc';
import { ImportDoc } from '../../doc/inplace/importdoc';
import { InplaceInputDemo } from '../../doc/inplace/inputdoc';
import { MethodsDoc } from '../../doc/inplace/methodsdoc';

@Component({
    templateUrl: './inplacedemo.html'
})
export class InplaceDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: InplaceBasicDemo
        },
        {
            id: 'input',
            label: 'Input',
            component: InplaceInputDemo
        },
        {
            id: 'image',
            label: 'Image',
            component: InplaceImageDemo
        },
        {
            id: 'data',
            label: 'Data',
            component: InplaceDataDemo
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        }
    ];
}
