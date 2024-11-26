import { AccessibilityDoc } from '@/doc/tag/accessibilitydoc';
import { BasicDoc } from '@/doc/tag/basicdoc';
import { IconDoc } from '@/doc/tag/icondoc';
import { ImportDoc } from '@/doc/tag/importdoc';
import { PillDoc } from '@/doc/tag/pilldoc';
import { SeverityDoc } from '@/doc/tag/severitydoc';
import { TagDocModule } from '@/doc/tag/tagdoc.module';
import { TemplateDoc } from '@/doc/tag/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Tag Component" header="Tag" description="Tag component is used to categorize content." [docs]="docs" [apiDocs]="['Tag']" themeDocs="tag"></app-doc>`,
    standalone: true,
    imports: [TagDocModule]
})
export class TagDemo {
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
            id: 'pill',
            label: 'Pill',
            component: PillDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
