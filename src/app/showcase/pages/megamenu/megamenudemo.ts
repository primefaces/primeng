import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/megamenu/importdoc';
import { MegaMenuBasicDemo } from '../../doc/megamenu/basicdoc';
import { EventsDoc } from '../../doc/megamenu/eventsdoc';
import { MegaMenuItemDoc } from '../../doc/megamenu/megamenuitemdoc';
import { PropsDoc } from '../../doc/megamenu/propsdoc';
import { StyleDoc } from '../../doc/megamenu/styledoc';
import { MegaMenuTemplateDemo } from '../../doc/megamenu/templatedoc';
import { TemplatesDoc } from '../../doc/megamenu/templatesdoc';
import { MegaMenuVerticalDemo } from '../../doc/megamenu/verticaldoc';

@Component({
    templateUrl: './megamenudemo.html'
})
export class MegaMenuDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: MegaMenuBasicDemo
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: MegaMenuVerticalDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: MegaMenuTemplateDemo
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
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        },
        {
            id: 'megamenuitem',
            label: 'MegaMenuItem API',
            component: MegaMenuItemDoc
        }
    ];
}
