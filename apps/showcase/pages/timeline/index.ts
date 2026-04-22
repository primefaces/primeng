import { AccessibilityDoc } from '@/doc/timeline/accessibility-doc';
import { AlignmentDoc } from '@/doc/timeline/alignment-doc';
import { BasicDoc } from '@/doc/timeline/basic-doc';
import { HorizontalDoc } from '@/doc/timeline/horizontal-doc';
import { ImportDoc } from '@/doc/timeline/import-doc';
import { OppositeDoc } from '@/doc/timeline/opposite-doc';
import { TemplateDoc } from '@/doc/timeline/template-doc';
import { PTComponent } from '@/doc/timeline/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Timeline Component" header="Timeline" description="Timeline visualizes a series of chained events." [docs]="docs" [apiDocs]="['Timeline']" [ptDocs]="ptComponent" themeDocs="timeline"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './timelinedemo.scss'
})
export class TimelineDemo {
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
            id: 'alignment',
            label: 'Alignment',
            component: AlignmentDoc
        },
        {
            id: 'opposite',
            label: 'Opposite',
            component: OppositeDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'horizontal',
            label: 'Horizontal',
            component: HorizontalDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
