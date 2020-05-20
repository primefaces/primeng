import {Component} from '@angular/core';

@Component({
    selector: 'galleria-submenu',
    template: `
        <div class="content-section content-submenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/galleria']">&#9679; Documentation</a></li>
                <li><a [routerLink]="['/galleria/programmatic']">&#9679; Programmatic</a></li>
                <li><a [routerLink]="['/galleria/indicator']">&#9679; Indicator</a></li>
                <li><a [routerLink]="['/galleria/thumbnail']">&#9679; Thumbnail</a></li>
                <li><a [routerLink]="['/galleria/navigator']">&#9679; Navigator</a></li>
                <li><a [routerLink]="['/galleria/responsive']">&#9679; Responsive</a></li>
                <li><a [routerLink]="['/galleria/fullscreen']">&#9679; Fullscreen</a></li>
                <li><a [routerLink]="['/galleria/autoplay']">&#9679; AutoPlay</a></li>
                <li><a [routerLink]="['/galleria/caption']">&#9679; Caption</a></li>
                <li><a [routerLink]="['/galleria/advanced']">&#9679; Advanced</a></li>
            </ul>
        </div>
    `
})
export class GalleriaSubmenu {

}
