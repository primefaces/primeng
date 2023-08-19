import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/galleria/accessibilitydoc';
import { AdvancedDoc } from '../../doc/galleria/advanceddoc';
import { AutoPlayDoc } from '../../doc/galleria/autoplaydoc';
import { BasicDoc } from '../../doc/galleria/basicdoc';
import { CaptionDoc } from '../../doc/galleria/captiondoc';
import { ControlledDoc } from '../../doc/galleria/controlleddoc';
import { FullScreenTemplateDoc } from '../../doc/galleria/fullscreen/customcontentdoc';
import { WithoutThumbnailsDoc } from '../../doc/galleria/fullscreen/withoutthumbnailsdoc';
import { WithThumbnailsDoc } from '../../doc/galleria/fullscreen/withthumbnailsdoc';
import { ImportDoc } from '../../doc/galleria/importdoc';
import { ClickEventDoc } from '../../doc/galleria/indicator/clickeventdoc';
import { HoverEventDoc } from '../../doc/galleria/indicator/hovereventdoc';
import { PositionedDoc } from '../../doc/galleria/indicator/positioneddoc';
import { TemplateDoc } from '../../doc/galleria/indicator/templatedoc';
import { HoverDoc } from '../../doc/galleria/navigator/hoverdoc';
import { IndicatorsDoc } from '../../doc/galleria/navigator/indicatorsdoc';
import { ItemThumbnailsDoc } from '../../doc/galleria/navigator/itemthumbnailsdoc';
import { ItemWithoutThumbnailsDoc } from '../../doc/galleria/navigator/itemwithoutthumbnailsdoc';
import { ResponsiveDoc } from '../../doc/galleria/responsivedoc';
import { StyleDoc } from '../../doc/galleria/styledoc';
import { ThumbnailDoc } from '../../doc/galleria/thumbnaildoc';

@Component({
    templateUrl: './galleriademo.html',
    styleUrls: ['./galleriademo.scss']
})
export class GalleriaDemo {
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
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'indicator',
            label: 'Indicator',
            children: [
                {
                    id: 'clickevent',
                    label: 'Click Event',
                    component: ClickEventDoc
                },
                {
                    id: 'hoverevent',
                    label: 'Hover Event',
                    component: HoverEventDoc
                },
                {
                    id: 'positioned',
                    label: 'Positioned',
                    component: PositionedDoc
                },
                {
                    id: 'template',
                    label: 'Templating',
                    component: TemplateDoc
                }
            ]
        },
        {
            id: 'thumbnail',
            label: 'Thumbnail',
            component: ThumbnailDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'fullscreen',
            label: 'Full Screen',
            children: [
                {
                    id: 'withthumbnails',
                    label: 'With Thumbnails',
                    component: WithThumbnailsDoc
                },
                {
                    id: 'withtouthumbnails',
                    label: 'Without Thumbnails',
                    component: WithoutThumbnailsDoc
                },
                {
                    id: 'customcontent',
                    label: 'Custom Content',
                    component: FullScreenTemplateDoc
                }
            ]
        },
        {
            id: 'navigator',
            label: 'Navigator',
            children: [
                {
                    id: 'itemwiththumbnails',
                    label: 'With Thumbnails',
                    component: ItemThumbnailsDoc
                },
                {
                    id: 'itemwithtouthumbnails',
                    label: 'Without Thumbnails',
                    component: ItemWithoutThumbnailsDoc
                },
                {
                    id: 'hover',
                    label: 'Display on Hover',
                    component: HoverDoc
                },
                {
                    id: 'withindicators',
                    label: 'With Indicators',
                    component: IndicatorsDoc
                }
            ]
        },
        {
            id: 'autoplay',
            label: 'AutoPlay',
            component: AutoPlayDoc
        },
        {
            id: 'caption',
            label: 'Caption',
            component: CaptionDoc
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
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
}
