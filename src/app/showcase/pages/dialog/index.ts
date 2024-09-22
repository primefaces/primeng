import { Component } from '@angular/core';
import { BasicDoc } from '@doc/dialog/basicdoc';
import { ImportDoc } from '@doc/dialog/importdoc';
import { LongContentDoc } from '@doc/dialog/longcontentdoc';
import { ResponsiveDoc } from '@doc/dialog/responsivedoc';
import { PositionDoc } from '@doc/dialog/positiondoc';
import { MaximizableDoc } from '@doc/dialog/maximizabledoc';
import { TemplateDoc } from '@doc/dialog/templatedoc';
import { HeadlessDoc } from '@doc/dialog/headlessdoc';
import { AccessibilityDoc } from '@doc/dialog/accessibilitydoc';
import { WithoutModalDoc } from '@doc/dialog/withoutmodaldoc';
import { DialogDocModule } from '@doc/dialog/dialogdoc.module';

@Component({
    standalone: true,
    imports: [DialogDocModule],
    template: `
        <app-doc
            docTitle="Angular Dialog Component"
            header="Dialog"
            description="Dialog is a container to display content in an overlay window."
            [docs]="docs"
            [apiDocs]="['Dialog']"
            themeDocs="dialog"
        ></app-doc>
    `,
})
export class DialogDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc,
        },
        {
            id: 'maximizable',
            label: 'Maximizable',
            component: MaximizableDoc,
        },
        {
            id: 'longcontent',
            label: 'Long Content',
            component: LongContentDoc,
        },
        {
            id: 'withoutmodal',
            label: 'Without Modal',
            component: WithoutModalDoc,
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: ResponsiveDoc,
        },
        {
            id: 'headless',
            label: 'Headless',
            component: HeadlessDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
