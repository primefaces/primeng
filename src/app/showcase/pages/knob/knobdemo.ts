import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '../../doc/knob/reactiveformsdoc';
import { AccessibilityDoc } from '../../doc/knob/accessibilitydoc';
import { BasicDoc } from '../../doc/knob/basicdoc';
import { ColorDoc } from '../../doc/knob/colordoc';
import { DisabledDoc } from '../../doc/knob/disableddoc';
import { EventsDoc } from '../../doc/knob/eventsdoc';
import { ImportDoc } from '../../doc/knob/importdoc';
import { MinMaxDoc } from '../../doc/knob/minmaxdoc';
import { PropsDoc } from '../../doc/knob/propsdoc';
import { ReadonlyDoc } from '../../doc/knob/readonlydoc';
import { SizeDoc } from '../../doc/knob/sizedoc';
import { StepDoc } from '../../doc/knob/stepdoc';
import { StrokeDoc } from '../../doc/knob/strokedoc';
import { StyleDoc } from '../../doc/knob/styledoc';
import { TemplateDoc } from '../../doc/knob/templatedoc';

@Component({
    templateUrl: './knobdemo.html'
})
export class KnobDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'minmax',
            label: 'Min/Max',
            component: MinMaxDoc
        },
        {
            id: 'step',
            label: 'Step',
            component: StepDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'stroke',
            label: 'Stroke',
            component: StrokeDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'color',
            label: 'Color',
            component: ColorDoc
        },
        {
            id: 'readonly',
            label: 'ReadOnly',
            component: ReadonlyDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
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
