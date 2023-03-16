import { Component } from '@angular/core';
import { CardAdvancedDemo } from '../../doc/card/advanceddoc';
import { CardBasicDemo } from '../../doc/card/basicdoc';
import { ImportDoc } from '../../doc/card/importdoc';
import { PropsDoc } from '../../doc/card/propsdoc';
import { StyleDoc } from '../../doc/card/styledoc';
import { TemplatesDoc } from '../../doc/card/templatesdoc';

@Component({
    templateUrl: './carddemo.html'
})
export class CardDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: CardBasicDemo
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: CardAdvancedDemo
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
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
