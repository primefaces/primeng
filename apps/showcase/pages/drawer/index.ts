import { AccessibilityDoc } from '@/doc/drawer/accessibilitydoc';
import { BasicDoc } from '@/doc/drawer/basicdoc';
import { FullScreenDoc } from '@/doc/drawer/fullscreendoc';
import { HeadlessDoc } from '@/doc/drawer/headlessdoc';
import { ImportDoc } from '@/doc/drawer/importdoc';
import { PositionDoc } from '@/doc/drawer/positiondoc';
import { SizeDoc } from '@/doc/drawer/sizedoc';
import { TemplateDoc } from '@/doc/drawer/templatedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Drawer Component" header="Drawer" description="Drawer is a container component displayed as an overlay." [docs]="docs" [apiDocs]="['Drawer']" themeDocs="drawer"></app-doc> `
})
export class DrawerDemo {
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
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
