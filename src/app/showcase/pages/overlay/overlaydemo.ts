import { Component } from '@angular/core';
import { OverlayBasicDemo } from '@doc/overlay/basicdoc';
import { AppendToDoc } from '@doc/overlay/appendtodoc';
import { AutoZIndexDoc } from '@doc/overlay/autozindexdoc';
import { BaseZIndexDoc } from '@doc/overlay/basezindexdoc';
import { EventsDoc } from '@doc/overlay/eventsdoc';
import { HideOnEscapeDoc } from '@doc/overlay/hideonescapedoc';
import { ImportDoc } from '@doc/overlay/importdoc';
import { ModeDoc } from '@doc/overlay/modedoc';
import { ResponsiveDoc } from '@doc/overlay/responsivedoc';
import { StyleDoc } from '@doc/overlay/styledoc';
import { TargetDoc } from '@doc/overlay/targetdoc';
import { OverlayTemplateDemo } from '@doc/overlay/templatedoc';
import { TransitionOptionsDoc } from '@doc/overlay/transitionoptionsdoc';
import { AccessibilityDoc } from '@doc/overlay/accessibilitydoc';

@Component({
    templateUrl: './overlaydemo.html'
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
