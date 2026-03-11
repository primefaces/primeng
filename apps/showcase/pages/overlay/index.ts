import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/overlay/accessibility-doc';
import { AppendToDoc } from '@/doc/overlay/appendto-doc';
import { AutoZIndexDoc } from '@/doc/overlay/autozindex-doc';
import { BaseZIndexDoc } from '@/doc/overlay/basezindex-doc';
import { OverlayBasicDemo } from '@/doc/overlay/basic-doc';
import { EventsDoc } from '@/doc/overlay/events-doc';
import { HideOnEscapeDoc } from '@/doc/overlay/hideonescape-doc';
import { ImportDoc } from '@/doc/overlay/import-doc';
import { ModeDoc } from '@/doc/overlay/mode-doc';
import { PTComponent } from '@/doc/overlay/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/overlay/responsive-doc';
import { TargetDoc } from '@/doc/overlay/target-doc';
import { OverlayTemplateDemo } from '@/doc/overlay/template-doc';
import { TransitionOptionsDoc } from '@/doc/overlay/transitionoptions-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Overlay API - PrimeNG"
        header="Overlay API"
        description="This API allows overlay components to be controlled from the PrimeNG. In this way, all overlay components in the application can have the same behavior."
        [docs]="docs"
        [apiDocs]="['Overlay', 'OverlayOptions']"
        [ptDocs]="ptComponent"
        themeDocs="overlay"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class OverlayDemo {
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
