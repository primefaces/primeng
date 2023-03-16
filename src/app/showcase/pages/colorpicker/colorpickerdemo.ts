import { Component } from '@angular/core';
import { InlineDoc } from '../../doc/colorpicker/inlinedoc';
import { BasicDoc } from '../../doc/colorpicker/basicdoc';
import { ImportDoc } from '../../doc/colorpicker/importdoc';
import { FormatDoc } from '../../doc/colorpicker/formatdoc';
import { DisabledDoc } from '../../doc/colorpicker/disableddoc';
import { PropsDoc } from '../../doc/colorpicker/propsdoc';
import { StyleDoc } from '../../doc/colorpicker/styledoc';
import { EventsDoc } from '../../doc/colorpicker/eventsdoc';

@Component({
    templateUrl: './colorpickerdemo.html'
})
export class ColorPickerDemo {
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
            id: 'inline',
            label: 'Inline',
            component: InlineDoc
        },
        {
            id: 'format',
            label: 'Format',
            component: FormatDoc
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
