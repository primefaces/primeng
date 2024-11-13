import { AccessibilityDoc } from '@/doc/overlay/accessibilitydoc';
import { AppendToDoc } from '@/doc/overlay/appendtodoc';
import { AutoZIndexDoc } from '@/doc/overlay/autozindexdoc';
import { BaseZIndexDoc } from '@/doc/overlay/basezindexdoc';
import { OverlayBasicDemo } from '@/doc/overlay/basicdoc';
import { EventsDoc } from '@/doc/overlay/eventsdoc';
import { HideOnEscapeDoc } from '@/doc/overlay/hideonescapedoc';
import { ImportDoc } from '@/doc/overlay/importdoc';
import { ModeDoc } from '@/doc/overlay/modedoc';
import { OverlayDocModule } from '@/doc/overlay/overlaydoc.module';
import { ResponsiveDoc } from '@/doc/overlay/responsivedoc';
import { StyleDoc } from '@/doc/overlay/styledoc';
import { TargetDoc } from '@/doc/overlay/targetdoc';
import { OverlayTemplateDemo } from '@/doc/overlay/templatedoc';
import { TransitionOptionsDoc } from '@/doc/overlay/transitionoptionsdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Overlay API - PrimeNG"
        header="Overlay API"
        description="This API allows overlay components to be controlled from the PrimeNGConfig. In this way, all overlay components in the application can have the same behavior."
        [docs]="docs"
        [apiDocs]="['Overlay', 'OverlayOptions']"
        themeDocs="overlay"
    ></app-doc>`,
    standalone: true,
    imports: [OverlayDocModule]
})
export class OverlayDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: OverlayBasicDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: OverlayTemplateDemo
        },
        {
            id: 'options',
            label: 'Options',
            children: [
                {
                    id: 'mode',
                    label: 'Mode',
                    component: ModeDoc
                },
                {
                    id: 'responsive',
                    label: 'Responsive',
                    component: ResponsiveDoc
                },
                {
                    id: 'append-to',
                    label: 'AppendTo',
                    component: AppendToDoc
                },
                {
                    id: 'target',
                    label: 'Target',
                    component: TargetDoc
                },
                {
                    id: 'style',
                    label: 'Style',
                    component: StyleDoc
                },
                {
                    id: 'base-z-index',
                    label: 'BaseZIndex',
                    component: BaseZIndexDoc
                },
                {
                    id: 'auto-z-index',
                    label: 'AutoZIndex',
                    component: AutoZIndexDoc
                },
                {
                    id: 'hide-on-escape',
                    label: 'HideOnEscape',
                    component: HideOnEscapeDoc
                },
                {
                    id: 'transition-options',
                    label: 'ShowTransitionOptions and HideTransitionOptions',
                    component: TransitionOptionsDoc
                },
                {
                    id: 'events',
                    label: 'Events',
                    component: EventsDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
