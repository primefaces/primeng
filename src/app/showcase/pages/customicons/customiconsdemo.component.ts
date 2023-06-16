import { Component } from '@angular/core';
import { FontAwesomeDoc } from '../../doc/customicons/fontawesomedoc';
import { ImageDoc } from '../../doc/customicons/imagedoc';
import { MaterialDoc } from '../../doc/customicons/materialdoc';
import { SVGDoc } from '../../doc/customicons/svgdoc';

@Component({
    templateUrl: './customiconsdemo.component.html'
})
export class CustomIconsDemoComponent {
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
