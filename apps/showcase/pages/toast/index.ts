import { AccessibilityDoc } from '@/doc/toast/accessibilitydoc';
import { AnimationDoc } from '@/doc/toast/animationdoc';
import { BasicDoc } from '@/doc/toast/basicdoc';
import { HeadlessDoc } from '@/doc/toast/headlessdoc';
import { ImportDoc } from '@/doc/toast/importdoc';
import { MultipleDoc } from '@/doc/toast/multipledoc';
import { PositionDoc } from '@/doc/toast/positiondoc';
import { ResponsiveDoc } from '@/doc/toast/responsivedoc';
import { SeverityDoc } from '@/doc/toast/severitydoc';
import { StickyDoc } from '@/doc/toast/stickydoc';
import { TemplateDoc } from '@/doc/toast/templatedoc';
import { ToastDocModule } from '@/doc/toast/toastdoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Toast Component" header="Toast" description="Toast is used to display messages in an overlay." [docs]="docs" [apiDocs]="['Toast', 'ToastMessage']" themeDocs="toast"></app-doc> `,
    standalone: true,
    imports: [ToastDocModule]
})
export class ToastDemo {
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
            id: 'animation',
            label: 'Animation',
            component: AnimationDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
