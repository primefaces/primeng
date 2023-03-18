import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BasicDoc } from '../../doc/scroller/basicdoc';
import { DelayDoc } from '../../doc/scroller/delaydoc';
import { EventsDoc } from '../../doc/scroller/eventsdoc';
import { HorizontalDoc } from '../../doc/scroller/horizonntaldoc';
import { HorizontalAndVerticalDoc } from '../../doc/scroller/horizontalandverticaldoc';
import { ImportDoc } from '../../doc/scroller/importdoc';
import { LazyLoadDoc } from '../../doc/scroller/lazyloaddoc';
import { LoaderBasicDoc } from '../../doc/scroller/loaderbasicdoc';
import { LoaderTemplateDoc } from '../../doc/scroller/loadertemplatedoc';
import { MethodsDoc } from '../../doc/scroller/methodsdoc';
import { PropsDoc } from '../../doc/scroller/propsdoc';
import { ScrollOptionsDoc } from '../../doc/scroller/scrolloptionsdoc';
import { StyleDoc } from '../../doc/scroller/styledoc';
import { TemplateDoc } from '../../doc/scroller/templatedoc';
import { TemplatesDoc } from '../../doc/scroller/templatesdoc';

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
            id: 'horizontal-and-vertical',
            label: 'Horizontal and Vertical',
            component: HorizontalAndVerticalDoc
        },
        {
            id: 'loader',
            label: 'Loader',
            children: [
                {
                    id: 'loader-basic',
                    label: 'Basic',
                    component: LoaderBasicDoc
                },
                {
                    id: 'loader-template',
                    label: 'Loader Template',
                    component: LoaderTemplateDoc
                }
            ]
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
