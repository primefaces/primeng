import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/slider/basicdoc';
import { EventsDoc } from '../../doc/slider/eventsdoc';
import { ImportDoc } from '../../doc/slider/importdoc';
import { InputDoc } from '../../doc/slider/inputdoc';
import { PropsDoc } from '../../doc/slider/propsdoc';
import { RangeDoc } from '../../doc/slider/rangedoc';
import { StepDoc } from '../../doc/slider/stepdoc';
import { StyleDoc } from '../../doc/slider/styledoc';
import { VerticalDoc } from '../../doc/slider/verticaldoc';

@Component({
    templateUrl: './sliderdemo.html',
    styleUrls: ['./sliderdemo.scss']
})
export class SliderDemo {
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
            id: 'input',
            label: 'Input',
            component: InputDoc
        },
        {
            id: 'step',
            label: 'Step',
            component: StepDoc
        },
        {
            id: 'range',
            label: 'Range',
            component: RangeDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        }
    ];
}
