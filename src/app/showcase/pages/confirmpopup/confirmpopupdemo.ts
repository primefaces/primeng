import { Component } from '@angular/core';
import { BasicDoc } from '@doc/confirmpopup/basicdoc';
import { ImportDoc } from '@doc/confirmpopup/importdoc';
import { TemplateDoc } from '@doc/confirmpopup/templatedoc';
import { StyleDoc } from '@doc/confirmpopup/styledoc';
import { AccessibilityDoc } from '@doc/confirmpopup/accessibilitydoc';
import { HeadlessDoc } from '@doc/confirmpopup/headlessdoc';
@Component({
    templateUrl: './confirmpopupdemo.html'
})
export class ConfirmPopupDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc
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
