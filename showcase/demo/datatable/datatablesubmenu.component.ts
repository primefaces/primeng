import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'datatable-demos',
    template: `
        <div id="datatable-submenu" class="ContentSideSections SubSubMenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['DataTableDemo']">&#9679; Basic</a></li>
                <li><a [routerLink]="['DataTableFacetsDemo']">&#9679; Facets</a></li>
                <li><a [routerLink]="['DataTableGroupDemo']">&#9679; Group</a></li>
                <li><a [routerLink]="['DataTablePaginatorDemo']">&#9679; Paginator</a></li>
                <li><a [routerLink]="['DataTableSortDemo']">&#9679; Sort</a></li>
                <li><a [routerLink]="['DataTableFilterDemo']">&#9679; Filter</a></li>
                <li><a [routerLink]="['DataTableSelectionDemo']">&#9679; Selection</a></li>
                <li><a [routerLink]="['DataTableEditableDemo']">&#9679; Editable</a></li>
                <li><a [routerLink]="['DataTableColResizeDemo']">&#9679; Resize</a></li>
                <li><a [routerLink]="['DataTableColReorderDemo']">&#9679; Reorder</a></li>
                <li><a [routerLink]="['DataTableScrollDemo']">&#9679; Scroll</a></li>
                <li><a [routerLink]="['DataTableResponsiveDemo']">&#9679; Responsive</a></li>
            </ul>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class DataTableSubmenu {
}
