import { AccessibilityDoc } from '@/doc/dialog/accessibility-doc';
import { BasicDoc } from '@/doc/dialog/basic-doc';
import { HeadlessDoc } from '@/doc/dialog/headless-doc';
import { ImportDoc } from '@/doc/dialog/import-doc';
import { LongContentDoc } from '@/doc/dialog/longcontent-doc';
import { MaximizableDoc } from '@/doc/dialog/maximizable-doc';
import { PositionDoc } from '@/doc/dialog/position-doc';
import { PTComponent } from '@/doc/dialog/pt/PTComponent';
import { ResponsiveDoc } from '@/doc/dialog/responsive-doc';
import { TemplateDoc } from '@/doc/dialog/template-doc';
import { WithoutModalDoc } from '@/doc/dialog/withoutmodal-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Dialog Component" header="Dialog" description="Dialog is a container to display content in an overlay window." [docs]="docs" [apiDocs]="['Dialog']" [ptDocs]="ptComponent" themeDocs="dialog"></app-doc> `
})
export class DialogDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'maximizable',
            label: 'Maximizable',
            component: MaximizableDoc
        },
        {
            id: 'longcontent',
            label: 'Long Content',
            component: LongContentDoc
        },
        {
            id: 'withoutmodal',
            label: 'Without Modal',
            component: WithoutModalDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
