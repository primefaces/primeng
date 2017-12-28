import {Component} from '@angular/core';

@Component({
    selector: 'table-submenu',
    template: `
        <div class="content-section SubSubMenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/table']">&#9679; Basic</a></li>
                <li><a [routerLink]="['/table/page']">&#9679; Page</a></li>
                <li><a [routerLink]="['/table/sort']">&#9679; Sort</a></li>
                <li><a [routerLink]="['/table/selection']">&#9679; Selection</a></li>
            </ul>
        </div>
    `
})
export class TableSubmenu {}
