import { Component } from '@angular/core';
import { TagIconDemo } from '../../doc/tag/icondoc';
import { ImportDoc } from '../../doc/tag/importdoc';
import { TagSeverityDemo } from '../../doc/tag/severitydoc';
import { TagBasicDDemo } from '../../doc/tag/basicdoc';
import { PropsDoc } from '../../doc/tag/propsdoc';
import { StyleDoc } from '../../doc/tag/styledoc';
import { TagPillDemo } from '../../doc/tag/pilldoc';
import { TagTemplateDemo } from '../../doc/tag/templatedoc';

@Component({
    templateUrl: './tagdemo.html'
})
export class TagDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: TagBasicDDemo
        },
        {
            id: 'severity',
            label: 'Severity',
            component: TagSeverityDemo
        },
        {
            id: 'pill',
            label: 'Pill',
            component: TagPillDemo
        },
        {
            id: 'icon',
            label: 'Icon',
            component: TagIconDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: TagTemplateDemo
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
