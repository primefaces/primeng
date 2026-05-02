import { AccessibilityDoc } from '@/doc/badge/accessibility-doc';
import { BasicDoc } from '@/doc/badge/basic-doc';
import { ButtonDoc } from '@/doc/badge/button-doc';
import { ImportDoc } from '@/doc/badge/import-doc';
import { OverlayDoc } from '@/doc/badge/overlay-doc';
import { SeverityDoc } from '@/doc/badge/severity-doc';
import { SizeDoc } from '@/doc/badge/size-doc';
import { PTComponent } from '@/doc/badge/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Badge Component" header="Badge" description="Badge is a small status indicator for another element." [docs]="docs" [apiDocs]="['Badge', 'BadgeDirective']" [ptDocs]="ptComponent" themeDocs="Badge"></app-doc>`
})
export class BadgeDemo {
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
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'overlay',
            label: 'Overlay',
            component: OverlayDoc
        },
        {
            id: 'button',
            label: 'Button',
            component: ButtonDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
