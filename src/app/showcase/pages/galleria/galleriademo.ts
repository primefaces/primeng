import { Component } from '@angular/core';
import { GalleriaAdvancedDemo } from '../../doc/galleria/advanceddoc';
import { GalleriaAutoplayDemo } from '../../doc/galleria/autoplaydoc';
import { GalleriaBasicDemo } from '../../doc/galleria/basicdoc';
import { GalleriaCaptionDemo } from '../../doc/galleria/captiondoc';
import { GalleriaControlledDemo } from '../../doc/galleria/controlleddoc';
import { GalleriaFullScreenTemplateDemo } from '../../doc/galleria/fullscreen/customcontentdoc';
import { FullScreenDoc } from '../../doc/galleria/fullscreen/fullscreendoc';
import { GalleriaWithoutThumbnailsDemo } from '../../doc/galleria/fullscreen/withoutthumbnailsdoc';
import { GalleriaWithThumbnailsDemo } from '../../doc/galleria/fullscreen/withthumbnailsdoc';
import { ImportDoc } from '../../doc/galleria/importdoc';
import { GalleriaIndicatorClickEventDemo } from '../../doc/galleria/indicator/clickeventdoc';
import { GalleriaIndicatorHoverEventDemo } from '../../doc/galleria/indicator/hovereventdoc';
import { IndicatorDoc } from '../../doc/galleria/indicator/indicatordoc';
import { GalleriaIndicatorPositionedDemo } from '../../doc/galleria/indicator/positioneddoc';
import { GalleriaIndicatorTemplateDemo } from '../../doc/galleria/indicator/templatedoc';
import { HoverDoc } from '../../doc/galleria/navigator/hoverdoc';
import { IndicatorsDoc } from '../../doc/galleria/navigator/indicatorsdoc';
import { ItemThumbnailsDoc } from '../../doc/galleria/navigator/itemthumbnailsdoc';
import { ItemWithoutThumbnailsDoc } from '../../doc/galleria/navigator/itemwithoutthumbnailsdoc';
import { NavigatorDoc } from '../../doc/galleria/navigator/navigatordoc';
import { PropsDoc } from '../../doc/galleria/propsdoc';
import { GalleriaResponsiveDemo } from '../../doc/galleria/responsivedoc';
import { StyleDoc } from '../../doc/galleria/styledoc';
import { GalleriaThumbnailDemo } from '../../doc/galleria/thumbnaildoc';

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
            component: GalleriaBasicDemo
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: GalleriaControlledDemo
        },
        {
            id: 'indicator',
            label: 'Indicator',
            component: IndicatorDoc,
            children: [
                {
                    id: 'clickevent',
                    label: 'Click Event',
                    component: GalleriaIndicatorClickEventDemo
                },
                {
                    id: 'hoverevent',
                    label: 'Hover Event',
                    component: GalleriaIndicatorHoverEventDemo
                },
                {
                    id: 'positioned',
                    label: 'Positioned',
                    component: GalleriaIndicatorPositionedDemo
                },
                {
                    id: 'template',
                    label: 'Templating',
                    component: GalleriaIndicatorTemplateDemo
                }
            ]
        },
        {
            id: 'thumbnail',
            label: 'Thumbnail',
            component: GalleriaThumbnailDemo
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: GalleriaResponsiveDemo
        },
        {
            id: 'fullscreen',
            label: 'Full Screen',
            component: FullScreenDoc,
            children: [
                {
                    id: 'withthumbnails',
                    label: 'With Thumbnails',
                    component: GalleriaWithThumbnailsDemo
                },
                {
                    id: 'withtouthumbnails',
                    label: 'Without Thumbnails',
                    component: GalleriaWithoutThumbnailsDemo
                },
                {
                    id: 'customcontent',
                    label: 'Custom Content',
                    component: GalleriaFullScreenTemplateDemo
                }
            ]
        },
        {
            id: 'navigator',
            label: 'Navigator',
            component: NavigatorDoc,
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
            component: GalleriaAutoplayDemo
        },
        {
            id: 'caption',
            label: 'Caption',
            component: GalleriaCaptionDemo
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: GalleriaAdvancedDemo
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
