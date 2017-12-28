import {Component} from '@angular/core';

@Component({
    selector: 'table-submenu',
    template: `
        <div class="content-section SubSubMenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/table']">&#9679; Basic</a></li>
                <li><a [routerLink]="['/table/sections']">&#9679; Sections</a></li>
                <li><a [routerLink]="['/table/page']">&#9679; Page</a></li>
                <li><a [routerLink]="['/table/sort']">&#9679; Sort</a></li>
                <li><a [routerLink]="['/table/selection']">&#9679; Selection</a></li>
                <li><a [routerLink]="['/table/filter']">&#9679; Filter</a></li>
                <li><a [routerLink]="['/table/style']">&#9679; Style</a></li>
            </ul>
        </div>
    `
})
export class TableSubmenu {}
