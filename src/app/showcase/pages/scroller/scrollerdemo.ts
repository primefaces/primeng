import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/scroller/basicdoc';
import { DelayDoc } from '../../doc/scroller/delaydoc';
import { EventsDoc } from '../../doc/scroller/eventsdoc';
import { HorizontalDoc } from '../../doc/scroller/horizontaldoc';
import { GridDoc } from '../../doc/scroller/griddoc';
import { ImportDoc } from '../../doc/scroller/importdoc';
import { LazyLoadDoc } from '../../doc/scroller/lazyloaddoc';
import { LoaderDoc } from '../../doc/scroller/loaderdoc';
import { MethodsDoc } from '../../doc/scroller/methodsdoc';
import { PropsDoc } from '../../doc/scroller/propsdoc';
import { ScrollOptionsDoc } from '../../doc/scroller/scrolloptionsdoc';
import { StyleDoc } from '../../doc/scroller/styledoc';
import { TemplateDoc } from '../../doc/scroller/templatedoc';
import { TemplatesDoc } from '../../doc/scroller/templatesdoc';
import { ProgrammaticDoc } from '../../doc/scroller/programmaticdoc';
import { AccessibilityDoc } from '../../doc/scroller/accessibilitydoc';

@Component({
    templateUrl: './scrollerdemo.html',
    styleUrls: ['./scrollerdemo.scss']
})
export class ScrollerDemo {
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
            id: 'horizontal',
            label: 'Horizontal',
            component: HorizontalDoc
        },
        {
            id: 'grid',
            label: 'Grid',
            component: GridDoc
        },
        {
            id: 'programmatic',
            label: 'Programmatic',
            component: ProgrammaticDoc
        },
        {
            id: 'loader',
            label: 'Loader',
            component: LoaderDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc
        },
        {
            id: 'lazy-load',
            label: 'Lazy Load',
            component: LazyLoadDoc
        },
        {
            id: 'scroll-options',
            label: 'Scroll Options',
            component: ScrollOptionsDoc
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
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
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
        }
    ];
}
