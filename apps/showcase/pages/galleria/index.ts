import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/galleria/accessibility-doc';
import { AdvancedDoc } from '@/doc/galleria/advanced-doc';
import { AutoPlayDoc } from '@/doc/galleria/autoplay-doc';
import { BasicDoc } from '@/doc/galleria/basic-doc';
import { CaptionDoc } from '@/doc/galleria/caption-doc';
import { ControlledDoc } from '@/doc/galleria/controlled-doc';
import { CustomContentDoc } from '@/doc/galleria/fullscreen/customcontent-doc';
import { WithoutThumbnailsDoc } from '@/doc/galleria/fullscreen/withoutthumbnails-doc';
import { WithThumbnailsDoc } from '@/doc/galleria/fullscreen/withthumbnails-doc';
import { ImportDoc } from '@/doc/galleria/import-doc';
import { ClickEventDoc } from '@/doc/galleria/indicator/clickevent-doc';
import { HoverEventDoc } from '@/doc/galleria/indicator/hoverevent-doc';
import { PositionedDoc } from '@/doc/galleria/indicator/positioned-doc';
import { TemplateDoc } from '@/doc/galleria/indicator/template-doc';
import { HoverDoc } from '@/doc/galleria/navigator/hover-doc';
import { IndicatorsDoc } from '@/doc/galleria/navigator/indicators-doc';
import { ItemThumbnailsDoc } from '@/doc/galleria/navigator/itemthumbnails-doc';
import { ItemWithoutThumbnailsDoc } from '@/doc/galleria/navigator/itemwithoutthumbnails-doc';
import { PTComponent } from '@/doc/galleria/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/galleria/responsive-doc';
import { ThumbnailDoc } from '@/doc/galleria/thumbnail-doc';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc docTitle="Angular Gallery Component" header="Galleria" description="Galleria is an advanced content gallery component." [docs]="docs" [apiDocs]="['Galleria']" [ptDocs]="ptComponent" componentName="Galleria"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './galleriademo.scss'
})
export class GalleriaDemo {
    ptComponent = PTComponent;
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
                    id: 'position',
                    label: 'Position',
                    component: PositionedDoc
                },
                {
                    id: 'template',
                    label: 'Template',
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
                    component: CustomContentDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
