import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'datascroller-demos',
    template: `
        <div id="datatable-submenu" class="ContentSideSections SubSubMenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/datascroller']">&#9679; Window</a></li>
                <li><a [routerLink]="['/datascrollerinline']">&#9679; Inline</a></li>
                <li><a [routerLink]="['/datascrollerloader']">&#9679; Loader</a></li>
                <li><a [routerLink]="['/datascrollerinfinite']">&#9679; Infinite</a></li>
            </ul>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class DataScrollerSubMenu {
}
