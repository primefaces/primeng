import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/speeddial/accessibilitydoc';
import { CircleDoc } from '@doc/speeddial/circledoc';
import { CustomDoc } from '@doc/speeddial/customdoc';
import { ImportDoc } from '@doc/speeddial/importdoc';
import { LinearDoc } from '@doc/speeddial/lineardoc';
import { MaskDoc } from '@doc/speeddial/maskdoc';
import { QuarterCircleDoc } from '@doc/speeddial/quartercircledoc';
import { SemiCircleDoc } from '@doc/speeddial/semicircledoc';
import { StyleDoc } from '@doc/speeddial/styledoc';
import { TooltipDoc } from '@doc/speeddial/tooltipdoc';

@Component({
    templateUrl: './speeddialdemo.html',
    styleUrls: ['./speeddialdemo.scss']
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
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
