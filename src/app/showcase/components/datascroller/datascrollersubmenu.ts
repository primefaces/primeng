import {Component} from '@angular/core';

@Component({
    selector: 'datascroller-demos',
    template: `
        <div id="datatable-submenu" class="content-section content-submenu ui-helper-clearfix">
            <ul>
                <li><a [routerLink]="['/datascroller']">&#9679; Window</a></li>
                <li><a [routerLink]="['/datascroller/inline']">&#9679; Inline</a></li>
                <li><a [routerLink]="['/datascroller/loader']">&#9679; Loader</a></li>
                <li><a [routerLink]="['/datascroller/infinite']">&#9679; Infinite</a></li>
            </ul>
        </div>
    `
})
export class DataScrollerSubMenu {
}
