import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'datatable-demos',
    template: `
        <div id="datatable-submenu" class="ContentSideSections SubSubMenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/datatable']">&#9679; Basic</a></li>
                <li><a [routerLink]="['/datatablefacets']">&#9679; Facets</a></li>
                <li><a [routerLink]="['/datatabletemplating']">&#9679; Templating</a></li>
                <li><a [routerLink]="['/datatablegroup']">&#9679; Group</a></li>
                <li><a [routerLink]="['/datatablepaginator']">&#9679; Paginator</a></li>
                <li><a [routerLink]="['/datatablesort']">&#9679; Sort</a></li>
                <li><a [routerLink]="['/datatablefilter']">&#9679; Filter</a></li>
                <li><a [routerLink]="['/datatableselection']">&#9679; Selection</a></li>
                <li><a [routerLink]="['/datatableeditable']">&#9679; Editable</a></li>
                <li><a [routerLink]="['/datatablerowexpansion']">&#9679; Expand</a></li>
                <li><a [routerLink]="['/datatablecolresize']">&#9679; Resize</a></li>
                <li><a [routerLink]="['/datatablecolreorder']">&#9679; Reorder</a></li>
                <li><a [routerLink]="['/datatablescroll']">&#9679; Scroll</a></li>
                <li><a [routerLink]="['/datatablelazy']">&#9679; Lazy</a></li>
                <li><a [routerLink]="['/datatablecontextmenu']">&#9679; ContextMenu</a></li>
                <li><a [routerLink]="['/datatablecoltoggler']">&#9679; ColToggler</a></li>
                <li><a [routerLink]="['/datatableresponsive']">&#9679; Responsive</a></li>
                <li><a [routerLink]="['/datatablecrud']">&#9679; Crud</a></li>
                <li><a [routerLink]="['/datatableexport']">&#9679; Export</a></li>
            </ul>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class DataTableSubmenu {
}
