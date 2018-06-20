import {Component} from '@angular/core';

@Component({
    selector: 'treetable-submenu',
    template: `
        <div class="content-section content-submenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/treetable']">&#9679; Documentation</a></li>
                <li><a [routerLink]="['/treetable/sections']">&#9679; Sections</a></li>
                <li><a [routerLink]="['/treetable/page']">&#9679; Page</a></li>
                <li><a [routerLink]="['/treetable/sort']">&#9679; Sort</a></li>
                <li><a [routerLink]="['/treetable/selection']">&#9679; Selection</a></li>
                <li><a [routerLink]="['/treetable/colgroup']">&#9679; ColGroup</a></li>
                <li><a [routerLink]="['/treetable/lazy']">&#9679; Lazy</a></li>
                <li><a [routerLink]="['/treetable/edit']">&#9679; Edit</a></li>
                <li><a [routerLink]="['/treetable/scroll']">&#9679; Scroll</a></li>
                <li><a [routerLink]="['/treetable/colresize']">&#9679; Resize</a></li>
                <li><a [routerLink]="['/treetable/reorder']">&#9679; Reorder</a></li>
                <li><a [routerLink]="['/treetable/coltoggle']">&#9679; Toggle</a></li>
                <li><a [routerLink]="['/treetable/style']">&#9679; Style</a></li>
                <li><a [routerLink]="['/treetable/contextmenu']">&#9679; ContextMenu</a></li>
                <li><a [routerLink]="['/treetable/responsive']">&#9679; Responsive</a></li>
            </ul>
        </div>
    `
})
export class TreeTableSubmenu {}
