import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/speeddial/accessibilitydoc';
import { CircleDoc } from '@doc/speeddial/circledoc';
import { ImportDoc } from '@doc/speeddial/importdoc';
import { LinearDoc } from '@doc/speeddial/lineardoc';
import { MaskDoc } from '@doc/speeddial/maskdoc';
import { QuarterCircleDoc } from '@doc/speeddial/quartercircledoc';
import { SemiCircleDoc } from '@doc/speeddial/semicircledoc';
import { TooltipDoc } from '@doc/speeddial/tooltipdoc';
import { TemplateDoc } from '@doc/speeddial/templatedoc';
import { SpeedDialDocModule } from '@doc/speeddial/speeddialdoc.module';

@Component({
    template: `<app-doc docTitle="Angular Speed Dial Component" header="Speed Dial" description="SpeedDial is a floating button with a popup menu." [docs]="docs" [apiDocs]="['SpeedDial']" themeDocs="speeddial"></app-doc>`,
    standalone: true,
    imports: [SpeedDialDocModule],
    styleUrl: './speeddialdemo.scss'
})
export class SpeedDialDemo {
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
