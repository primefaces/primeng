import { AccessibilityDoc } from '@/doc/ripple/accessibilitydoc';
import { CustomDoc } from '@/doc/ripple/customdoc';
import { DefaultDoc } from '@/doc/ripple/defaultdoc';
import { ImportDoc } from '@/doc/ripple/importdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
@Component({
    template: `<app-doc docTitle="Angular Ripple Component" header="Ripple" description="Ripple directive adds ripple effect to the host element." [docs]="docs" themeDocs="ripple"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './rippledemo.scss'
})
export class RippleDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'default',
            label: 'Default',
            component: DefaultDoc
        },
        {
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
