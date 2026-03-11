import { AccessibilityDoc } from '@/doc/ripple/accessibility-doc';
import { CustomDoc } from '@/doc/ripple/custom-doc';
import { DefaultDoc } from '@/doc/ripple/default-doc';
import { ImportDoc } from '@/doc/ripple/import-doc';
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
