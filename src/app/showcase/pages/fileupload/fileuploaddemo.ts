import { Component } from '@angular/core';
import { FileUploadAdvancedDemo } from '../../doc/fileupload/advanceddoc';
import { FileUploadAutoDemo } from '../../doc/fileupload/autodoc';
import { FileUploadBasicDemo } from '../../doc/fileupload/basicdoc';
import { EventsDoc } from '../../doc/fileupload/eventsdoc';
import { ImportDoc } from '../../doc/fileupload/importdoc';
import { MethodsDoc } from '../../doc/fileupload/methodsdoc';
import { PropsDoc } from '../../doc/fileupload/propsdoc';
import { StyleDoc } from '../../doc/fileupload/styledoc';
import { FileUploadTemplateDemo } from '../../doc/fileupload/templatedoc';
import { TemplatesDoc } from '../../doc/fileupload/templatesdoc';

@Component({
    templateUrl: './fileuploaddemo.html'
})
export class FileUploadDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: FileUploadBasicDemo
        },
        {
            id: 'auto',
            label: 'Auto',
            component: FileUploadAutoDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: FileUploadTemplateDemo
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: FileUploadAdvancedDemo
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
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
