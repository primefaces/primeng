import { Component } from '@angular/core';
import { BasicDoc } from '@doc/dialog/basicdoc';
import { ImportDoc } from '@doc/dialog/importdoc';
import { LongContentDoc } from '@doc/dialog/longcontentdoc';
import { StyleDoc } from '@doc/dialog/styledoc';
import { ResponsiveDoc } from '@doc/dialog/responsivedoc';
import { PositionDoc } from '@doc/dialog/positiondoc';
import { MaximizableDoc } from '@doc/dialog/maximizabledoc';
import { TemplateDoc } from '@doc/dialog/templatedoc';
import { OverlaysInsideDoc } from '@doc/dialog/overlaysinsidedoc';
import { ModalDoc } from '@doc/dialog/modaldoc';
import { HeadlessDoc } from '@doc/dialog/headlessdoc';
import { AccessibilityDoc } from '@doc/dialog/accessibilitydoc';
import { WithoutModalDoc } from '@doc/dialog/withoutmodaldoc';

@Component({
    templateUrl: './dialogdemo.html'
})
export class DialogDemo {
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
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'maximizable',
            label: 'Maximizable',
            component: MaximizableDoc
        },
        {
            id: 'longcontent',
            label: 'Long Content',
            component: LongContentDoc
        },
        {
            id: 'withoutmodal',
            label: 'Without Modal',
            component: WithoutModalDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
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
