import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/megamenu/importdoc';
import { BasicDoc } from '../../doc/megamenu/basicdoc';
import { EventsDoc } from '../../doc/megamenu/eventsdoc';
import { MegaMenuItemDoc } from '../../doc/megamenu/megamenuitemdoc';
import { PropsDoc } from '../../doc/megamenu/propsdoc';
import { StyleDoc } from '../../doc/megamenu/styledoc';
import { TemplateDoc } from '../../doc/megamenu/templatedoc';
import { TemplatesDoc } from '../../doc/megamenu/templatesdoc';
import { VerticalDoc } from '../../doc/megamenu/verticaldoc';
import { AccessibilityDoc } from '../../doc/megamenu/accessibilitydoc';

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
            component: BasicDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
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
