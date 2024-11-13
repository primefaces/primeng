import { AccessibilityDoc } from '@/doc/badge/accessibilitydoc';
import { BadgeDocModule } from '@/doc/badge/badgedoc.module';
import { BasicDoc } from '@/doc/badge/basicdoc';
import { ButtonDoc } from '@/doc/badge/buttondoc';
import { DirectiveDoc } from '@/doc/badge/directivedoc';
import { ImportDoc } from '@/doc/badge/importdoc';
import { OverlayDoc } from '@/doc/badge/overlaydoc';
import { SeverityDoc } from '@/doc/badge/severitydoc';
import { SizeDoc } from '@/doc/badge/sizedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [BadgeDocModule],
    template: ` <app-doc docTitle="Angular Badge Component" header="Badge" description="Badge is a small status indicator for another element." [docs]="docs" [apiDocs]="['Badge', 'BadgeDirective']" themeDocs="Badge"></app-doc>`
})
export class BadgeDemo {
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
            id: 'directive',
            label: 'Directive',
            component: DirectiveDoc
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
