import { Component } from '@angular/core';
import { EventsDoc } from '../../doc/inplace/eventsdoc';
import { ImageDoc } from '../../doc/inplace/imagedoc';
import { PropsDoc } from '../../doc/inplace/propsdoc';
import { StyleDoc } from '../../doc/inplace/styledoc';
import { BasicDoc } from '../../doc/inplace/basicdoc';
import { DataDoc } from '../../doc/inplace/datadoc';
import { ImportDoc } from '../../doc/inplace/importdoc';
import { InputDoc } from '../../doc/inplace/inputdoc';
import { MethodsDoc } from '../../doc/inplace/methodsdoc';
import { AccessibilityDoc } from '../../doc/inplace/accessibilitydoc';
import { TemplatesDoc } from '../../doc/inplace/templatesdoc';

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
            component: BasicDoc
        },
        {
            id: 'input',
            label: 'Input',
            component: InputDoc
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc
        },
        {
            id: 'data',
            label: 'Data',
            component: DataDoc
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

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
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
