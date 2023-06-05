import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/tooltip/basicdoc';
import { ImportDoc } from '../../doc/tooltip/importdoc';
import { PropsDoc } from '../../doc/tooltip/propsdoc';
import { StyleDoc } from '../../doc/tooltip/styledoc';
import { PositionDoc } from '../../doc/tooltip/positiondoc';
import { EventDoc } from '../../doc/tooltip/eventdoc';
import { AutoHideDoc } from '../../doc/tooltip/autohidedoc';
import { DelayDoc } from '../../doc/tooltip/delaydoc';
import { OptionsDoc } from '../../doc/tooltip/optionsdoc';
import { AccessibilityDoc } from '../../doc/tooltip/accessibilitydoc';

@Component({
    templateUrl: './tooltipdemo.html'
})
export class TooltipDemo {
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
            id: 'event',
            label: 'Events',
            component: EventDoc
        },
        {
            id: 'autohide',
            label: 'Auto Hide',
            component: AutoHideDoc
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc
        },
        {
            id: 'options',
            label: 'Tooltip Options',
            component: OptionsDoc
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

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        }
    ];
}
