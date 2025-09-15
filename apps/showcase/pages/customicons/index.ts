import { FontAwesomeDoc } from '@/doc/customicons/fontawesomedoc';
import { ImageDoc } from '@/doc/customicons/imagedoc';
import { MaterialDoc } from '@/doc/customicons/materialdoc';
import { SVGDoc } from '@/doc/customicons/svgdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc title="Custom Icons - PrimeNG" header="Custom Icons" description="PrimeNG components can be used with any icon library using the templating features." [docs]="docs"></app-doc>`
})
export class CustomIconsDemo {
    docs = [
        {
            id: 'material',
            label: 'Material',
            component: MaterialDoc
        },
        {
            id: 'fontawesome',
            label: 'Font Awesome',
            component: FontAwesomeDoc
        },
        {
            id: 'svg',
            label: 'SVG',
            component: SVGDoc
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc
        }
    ];
}
