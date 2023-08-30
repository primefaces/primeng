import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/toast/importdoc';
import { BasicDoc } from '../../doc/toast/basicdoc';
import { SeverityDoc } from '../../doc/toast/severitydoc';
import { AnimationDoc } from '../../doc/toast/animationdoc';
import { MultipleDoc } from '../../doc/toast/multipledoc';
import { PositionDoc } from '../../doc/toast/positiondoc';
import { ResponsiveDoc } from '../../doc/toast/responsivedoc';
import { LifeDoc } from '../../doc/toast/lifedoc';
import { StickyDoc } from '../../doc/toast/stickydoc';
import { StyleDoc } from '../../doc/toast/styledoc';
import { TargetDoc } from '../../doc/toast/targetdoc';
import { TemplateDoc } from '../../doc/toast/templatedoc';
import { ClearDoc } from '../../doc/toast/cleardoc';
import { AccessibilityDoc } from '../../doc/toast/accessibilitydoc';

@Component({
    templateUrl: './toastdemo.html'
})
export class ToastDemo {
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
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'target',
            label: 'Target',
            component: TargetDoc
        },
        {
            id: 'life',
            label: 'Life',
            component: LifeDoc
        },
        {
            id: 'sticky',
            label: 'Sticky',
            component: StickyDoc
        },
        {
            id: 'clear',
            label: 'Clearing Messages',
            component: ClearDoc
        },
        {
            id: 'templating',
            label: 'Templating',
            component: TemplateDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'animation',
            label: 'Animation',
            component: AnimationDoc
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
