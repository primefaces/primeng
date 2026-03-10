import { AccessibilityDoc } from '@/doc/ripple/accessibility-doc';
import { CustomDoc } from '@/doc/ripple/custom-doc';
import { DefaultDoc } from '@/doc/ripple/default-doc';
import { UsageDoc } from '@/doc/ripple/usage-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
@Component({
    template: `<app-doc docTitle="Angular Ripple Component" header="Ripple" description="Ripple directive adds ripple effect to the host element." [docs]="docs" [heroDoc]="heroDoc" themeDocs="ripple"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './rippledemo.scss'
})
export class RippleDemo {
    heroDoc = DefaultDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'default',
                    label: 'Default',
                    component: DefaultDoc
                },
                {
                    id: 'custom',
                    label: 'Custom',
                    component: CustomDoc
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
