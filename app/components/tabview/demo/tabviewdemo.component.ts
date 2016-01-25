import {Component} from 'angular2/core';
import {TabViewComponent} from '../tabview.component';
import {TabPanelComponent} from '../tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/components/tabview/demo/tabviewdemo.component.html',
    styles: [`
        .pui-tabview-left > .pui-tabview-nav {
            height: 150px;
        }
    `],
    directives: [TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class TabViewDemoComponent {

    activeTabIndex: number = 1;
}