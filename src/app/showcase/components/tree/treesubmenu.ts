import {Component} from '@angular/core';

@Component({
    selector: 'tree-submenu',
    template: `
        <div class="content-section content-submenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/tree']">&#9679; Documentation</a></li>
                <li><a [routerLink]="['/tree/templating']">&#9679; Templating</a></li>
                <li><a [routerLink]="['/tree/selection']">&#9679; Selection</a></li>
                <li><a [routerLink]="['/tree/filter']">&#9679; Filter</a></li>
                <li><a [routerLink]="['/tree/lazy']">&#9679; Lazy</a></li>
                <li><a [routerLink]="['/tree/scroll']">&#9679; Scroll</a></li>
                <li><a [routerLink]="['/tree/contextmenu']">&#9679; ContextMenu</a></li>
                <li><a [routerLink]="['/tree/dragdrop']">&#9679; DragDrop</a></li>
                <li><a [routerLink]="['/tree/horizontal']">&#9679; Horizontal</a></li>
            </ul>
        </div>
    `
})
export class TreeSubmenu {}
