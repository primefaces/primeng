import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/paginator/accessibilitydoc';
import { BasicDoc } from '@doc/paginator/basicdoc';
import { ImagesDoc } from '@doc/paginator/imagesdoc';
import { ImportDoc } from '@doc/paginator/importdoc';
import { StyleDoc } from '@doc/paginator/styledoc';
import { TemplateDoc } from '@doc/paginator/templatedoc';
import { LocaleDoc } from '@doc/paginator/localedoc';

@Component({
    templateUrl: './paginatordemo.html',
    styleUrls: ['./paginatordemo.scss']
})
export class PaginatorDemo {
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
            id: 'locale',
            label: 'Locale',
            component: LocaleDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'images',
            label: 'Images',
            component: ImagesDoc
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
