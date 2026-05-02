import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/toast/accessibility-doc';
import { BasicDoc } from '@/doc/toast/basic-doc';
import { HeadlessDoc } from '@/doc/toast/headless-doc';
import { ImportDoc } from '@/doc/toast/import-doc';
import { MultipleDoc } from '@/doc/toast/multiple-doc';
import { PositionDoc } from '@/doc/toast/position-doc';
import { PTComponent } from '@/doc/toast/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/toast/responsive-doc';
import { SeverityDoc } from '@/doc/toast/severity-doc';
import { StickyDoc } from '@/doc/toast/sticky-doc';
import { TemplateDoc } from '@/doc/toast/template-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Toast Component" header="Toast" description="Toast is used to display messages in an overlay." [docs]="docs" [apiDocs]="['Toast', 'ToastMessage']" [ptDocs]="ptComponent" themeDocs="toast"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class ToastDemo {
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
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'sticky',
            label: 'Sticky',
            component: StickyDoc
        },
        {
            id: 'templating',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
