import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/speeddial/accessibility-doc';
import { CircleDoc } from '@/doc/speeddial/circle-doc';
import { ImportDoc } from '@/doc/speeddial/import-doc';
import { LinearDoc } from '@/doc/speeddial/linear-doc';
import { MaskDoc } from '@/doc/speeddial/mask-doc';
import { PTComponent } from '@/doc/speeddial/pt/PTComponent';
import { QuarterCircleDoc } from '@/doc/speeddial/quartercircle-doc';
import { SemiCircleDoc } from '@/doc/speeddial/semicircle-doc';
import { TemplateDoc } from '@/doc/speeddial/template-doc';
import { TooltipDoc } from '@/doc/speeddial/tooltip-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Speed Dial Component" header="Speed Dial" description="SpeedDial is a floating button with a popup menu." [docs]="docs" [apiDocs]="['SpeedDial']" [ptDocs]="ptComponent" themeDocs="speeddial"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './speeddialdemo.scss'
})
export class SpeedDialDemo {
    ptComponent = PTComponent;

    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'linear',
            label: 'Linear',
            component: LinearDoc
        },
        {
            id: 'circle',
            label: 'Circle',
            component: CircleDoc
        },
        {
            id: 'semicircle',
            label: 'Semi Circle',
            component: SemiCircleDoc
        },
        {
            id: 'quartercircle',
            label: 'Quarter Circle',
            component: QuarterCircleDoc
        },
        {
            id: 'tooltip',
            label: 'Tooltip',
            component: TooltipDoc
        },
        {
            id: 'mask',
            label: 'Mask',
            component: MaskDoc
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
