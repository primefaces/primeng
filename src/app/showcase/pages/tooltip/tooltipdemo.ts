import { Component } from '@angular/core';
import { TooltipBasicDemo } from '../../doc/tooltip/basicdoc';
import { ImportDoc } from '../../doc/tooltip/importdoc';
import { PropsDoc } from '../../doc/tooltip/propsdoc';
import { StyleDoc } from '../../doc/tooltip/styledoc';
import { TooltipPositionDemo } from '../../doc/tooltip/positiondoc';
import { TooltipEventDemo } from '../../doc/tooltip/eventdoc';
import { TooltipAutoHideDemo } from '../../doc/tooltip/autohidedoc';
import { TooltipDelayDemo } from '../../doc/tooltip/delaydoc';
import { TooltipOptionsDemo } from '../../doc/tooltip/optionsdoc';

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
            component: TooltipBasicDemo
        },
        {
            id: 'position',
            label: 'Position',
            component: TooltipPositionDemo
        },
        {
            id: 'event',
            label: 'Events',
            component: TooltipEventDemo
        },
        {
            id: 'autohide',
            label: 'Auto Hide',
            component: TooltipAutoHideDemo
        },
        {
            id: 'delay',
            label: 'Delay',
            component: TooltipDelayDemo
        },
        {
            id: 'options',
            label: 'Tooltip Options',
            component: TooltipOptionsDemo
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
