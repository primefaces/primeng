import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/carousel/importdoc';
import { CarouselBasicDemo } from '../../doc/carousel/basicdoc';
import { PropsDoc } from '../../doc/carousel/propsdoc';
import { StyleDoc } from '../../doc/carousel/styledoc';
import { CarouselCircularDemo } from '../../doc/carousel/circulardoc';
import { CarouselNumScrollDemo } from '../../doc/carousel/numscrolldoc';
import { ResponsiveDoc } from '../../doc/carousel/responsivedoc';
import { CarouselVerticalDemo } from '../../doc/carousel/verticaldoc';
import { CarouselTemplateDemo } from '../../doc/carousel/templatedoc';

@Component({
    templateUrl: './carouseldemo.html',
    styleUrls: ['./carouseldemo.scss']
})
export class CarouselDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: CarouselBasicDemo
        },
        {
            id: 'circular',
            label: 'Circular',
            component: CarouselCircularDemo
        },
        {
            id: 'numscroll',
            label: 'Num Scroll',
            component: CarouselNumScrollDemo
        },
        {
            id: 'custom',
            label: 'Custom Content',
            component: CarouselTemplateDemo
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: CarouselVerticalDemo
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
