import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/carousel/importdoc';
import { BasicDoc } from '../../doc/carousel/basicdoc';
import { PropsDoc } from '../../doc/carousel/propsdoc';
import { StyleDoc } from '../../doc/carousel/styledoc';
import { CircularDoc } from '../../doc/carousel/circulardoc';
import { NumScrollDoc } from '../../doc/carousel/numscrolldoc';
import { ResponsiveDoc } from '../../doc/carousel/responsivedoc';
import { VerticalDoc } from '../../doc/carousel/verticaldoc';
import { TemplateDoc } from '../../doc/carousel/templatedoc';
import { AccessibilityDoc } from '../../doc/carousel/accessibilitydoc';
import { TemplatesDoc } from '../../doc/carousel/templatesdoc';

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
            component: BasicDoc
        },
        {
            id: 'circular',
            label: 'Circular',
            component: CircularDoc
        },
        {
            id: 'numscroll',
            label: 'Num Scroll',
            component: NumScrollDoc
        },
        {
            id: 'custom',
            label: 'Custom Content',
            component: TemplateDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
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
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
