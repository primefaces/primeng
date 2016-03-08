import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'datascroller-demos',
    template: `
        <div id="datatable-submenu" class="ContentSideSections SubSubMenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['DataScrollerDemo']">&#9679; Window</a></li>
                <li><a [routerLink]="['DataScrollerInlineDemo']">&#9679; Inline</a></li>
                <li><a [routerLink]="['DataScrollerLoaderDemo']">&#9679; Loader</a></li>
            </ul>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class DataScrollerSubMenu {
}
