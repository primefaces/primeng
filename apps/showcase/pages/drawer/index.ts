import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/drawer/accessibility-doc';
import { BasicDoc } from '@/doc/drawer/basic-doc';
import { FullScreenDoc } from '@/doc/drawer/fullscreen-doc';
import { HeadlessDoc } from '@/doc/drawer/headless-doc';
import { PositionDoc } from '@/doc/drawer/position-doc';
import { PTComponent } from '@/doc/drawer/pt/PTComponent';
import { SizeDoc } from '@/doc/drawer/size-doc';
import { TemplateDoc } from '@/doc/drawer/template-doc';
import { UsageDoc } from '@/doc/drawer/usage-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Drawer Component"
            header="Drawer"
            description="Drawer is a container component displayed as an overlay."
            [docs]="docs"
            [apiDocs]="['Drawer']"
            [ptDocs]="ptComponent"
            componentName="drawer"
            [heroDoc]="heroDoc"
        ></app-doc>
    `
})
export class DrawerDemo {
    heroDoc = BasicDoc;

    ptComponent = PTComponent;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                },
                {
                    id: 'position',
                    label: 'Position',
                    component: PositionDoc
                },
                {
                    id: 'size',
                    label: 'Size',
                    component: SizeDoc
                },
                {
                    id: 'fullscreen',
                    label: 'Full Screen',
                    component: FullScreenDoc
                },
                {
                    id: 'template',
                    label: 'Template',
                    component: TemplateDoc
                },
                {
                    id: 'headless',
                    label: 'Headless',
                    component: HeadlessDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
