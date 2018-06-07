import {Component} from '@angular/core';

@Component({
    selector: 'table-submenu',
    template: `
        <div class="content-section content-submenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/table']">&#9679; Documentation</a></li>
                <li><a [routerLink]="['/table/sections']">&#9679; Sections</a></li>
                <li><a [routerLink]="['/table/page']">&#9679; Page</a></li>
                <li><a [routerLink]="['/table/sort']">&#9679; Sort</a></li>
                <li><a [routerLink]="['/table/selection']">&#9679; Selection</a></li>
                <li><a [routerLink]="['/table/filter']">&#9679; Filter</a></li>
                <li><a [routerLink]="['/table/colgroup']">&#9679; ColGroup</a></li>
                <li><a [routerLink]="['/table/lazy']">&#9679; Lazy</a></li>
                <li><a [routerLink]="['/table/edit']">&#9679; Edit</a></li>
                <li><a [routerLink]="['/table/scroll']">&#9679; Scroll</a></li>
                <li><a [routerLink]="['/table/rowexpansion']">&#9679; RowExpand</a></li>
                <li><a [routerLink]="['/table/rowgroup']">&#9679; RowGroup</a></li>
                <li><a [routerLink]="['/table/colresize']">&#9679; Resize</a></li>
                <li><a [routerLink]="['/table/reorder']">&#9679; Reorder</a></li>
                <li><a [routerLink]="['/table/coltoggle']">&#9679; Toggle</a></li>
                <li><a [routerLink]="['/table/style']">&#9679; Style</a></li>
                <li><a [routerLink]="['/table/export']">&#9679; Export</a></li>
                <li><a [routerLink]="['/table/contextmenu']">&#9679; ContextMenu</a></li>
                <li><a [routerLink]="['/table/responsive']">&#9679; Responsive</a></li>
                <li><a [routerLink]="['/table/crud']">&#9679; Crud</a></li>
            </ul>
        </div>
    `
})
export class TableSubmenu {}
