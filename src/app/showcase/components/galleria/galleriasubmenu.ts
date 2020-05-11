import {Component} from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'galleria-submenu',
    template: `
        <div class="content-section content-submenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/galleria']">&#9679; Documentation</a></li>
                <li><a [routerLink]="['/galleria/basic']">&#9679; Basic</a></li>
                <li><a [routerLink]="['/galleria/indicator']">&#9679; Indicator</a></li>
                <li><a [routerLink]="['/galleria/thumbnail']">&#9679; Thumbnail</a></li>
                <li><a [routerLink]="['/galleria/preview']">&#9679; Preview</a></li>
                <li><a [routerLink]="['/galleria/responsive']">&#9679; Responsive</a></li>
                <li><a [routerLink]="['/galleria/fullscreen']">&#9679; Fullscreen</a></li>
                <li><a [routerLink]="['/galleria/circular']">&#9679; Circular</a></li>
                <li><a [routerLink]="['/galleria/caption']">&#9679; Caption</a></li>
            </ul>
        </div>
    `
})
export class GalleriaSubmenu {
    constructor(private app: AppComponent) { }
}
