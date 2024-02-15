import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/confirmdialog/basicdoc';
import { ImportDoc } from '../../doc/confirmdialog/importdoc';
import { StyleDoc } from '../../doc/confirmdialog/styledoc';
import { PositionDoc } from '../../doc/confirmdialog/positiondoc';
import { TemplateDoc } from '../../doc/confirmdialog/templatedoc';
import { HeadlessDoc } from '../../doc/confirmdialog/headlessdoc';
import { AccessibilityDoc } from '../../doc/confirmdialog/accessibilitydoc';

@Component({
    templateUrl: './confirmdialogdemo.html'
})
export class ConfirmDialogDemo {
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
            id: 'position',
            label: 'Position',
            component: PositionDoc
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
