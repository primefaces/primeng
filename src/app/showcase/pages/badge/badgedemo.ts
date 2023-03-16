import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/badge/importdoc';
import { BadgeSizeDemo } from '../../doc/badge/sizedoc';
import { BadgeBasicDemo } from '../../doc/badge/basicdoc';
import { BadgeButtonDemo } from '../../doc/badge/buttondoc';
import { BadgeDirectiveDemo } from '../../doc/badge/directivedoc';
import { BadgePositionDemo } from '../../doc/badge/positiondoc';
import { BadgeSeverityDemo } from '../../doc/badge/severitydoc';
import { StyleDoc } from '../../doc/badge/styledoc';
import { PropsDoc } from '../../doc/badge/propsdoc';

@Component({
    templateUrl: './badgedemo.html'
})
export class BadgeDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BadgeBasicDemo
        },
        {
            id: 'directive',
            label: 'Directive',
            component: BadgeDirectiveDemo
        },
        {
            id: 'severity',
            label: 'Severity',
            component: BadgeSeverityDemo
        },
        {
            id: 'size',
            label: 'Size',
            component: BadgeSizeDemo
        },
        {
            id: 'position',
            label: 'Position',
            component: BadgePositionDemo
        },
        {
            id: 'button',
            label: 'Button',
            component: BadgeButtonDemo
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
        }
    ];
}
