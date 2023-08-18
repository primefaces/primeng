import { Component } from '@angular/core';
import { OverviewDoc } from '../../doc/colors/overviewdoc';
import { PaletteDoc } from '../../doc/colors/palettedoc';
import { SurfacesDoc } from '../../doc/colors/surfacesdoc';

@Component({
    templateUrl: './colors.component.html'
})
export class ColorsDemoComponent {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'surfaces',
            label: 'Surfaces',
            component: SurfacesDoc
        },
        {
            id: 'palette',
            label: 'Palette',
            component: PaletteDoc
        }
    ];
}
