import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/metergroup/importdoc';
import { BasicDoc } from '../../doc/metergroup/basicdoc';
import { MultipleDoc } from '../../doc/metergroup/multipledoc';
import { IconDoc } from '../../doc/metergroup/icondoc';
import { LabelDoc } from '../../doc/metergroup/labeldoc';
import { VerticalDoc } from '../../doc/metergroup/verticaldoc';
import { MinMaxDoc } from '../../doc/metergroup/minmaxdoc';
import { TemplateDoc } from '../../doc/metergroup/templatedoc';
import { StyleDoc } from '../../doc/metergroup/styledoc';
import { AccessibilityDoc } from '../../doc/metergroup/accessibilitydoc';
@Component({
    templateUrl: './metergroupdemo.html'
})
export class MeterGroupDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'minmax',
            label: 'Min Max',
            component: MinMaxDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
