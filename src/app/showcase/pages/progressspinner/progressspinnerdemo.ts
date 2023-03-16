import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/avatar/importdoc';
import { ProgressSpinnerBasicDemo } from '../../doc/progressspinner/basicdoc';
import { StyleDoc } from '../../doc/progressspinner/styledoc';
import { ProgressSpinnerTemplateDemo } from '../../doc/progressspinner/templatedoc';
import { PropsDoc } from '../../doc/progressspinner/propsdoc';

@Component({
    templateUrl: './progressspinnerdemo.html',
    styleUrls: ['./progressspinnerdemo.css']
})
export class ProgressSpinnerDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: ProgressSpinnerBasicDemo
        },
        {
            id: 'templating',
            label: 'Template',
            component: ProgressSpinnerTemplateDemo
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
