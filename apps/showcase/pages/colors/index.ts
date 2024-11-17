import { ColorsDocModule } from '@/doc/colors/colorsdoc.module';
import { OverviewDoc } from '@/doc/colors/overviewdoc';
import { PaletteDoc } from '@/doc/colors/palettedoc';
import { SurfacesDoc } from '@/doc/colors/surfacesdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ColorsDocModule],
    template: ` <app-doc docTitle="Color System - PrimeNG" header="Colors" description="Each PrimeNG theme exports its own color palette." [docs]="docs"></app-doc>`
})
export class ColorsDemo {
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
