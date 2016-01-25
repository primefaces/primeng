import {Component} from 'angular2/core';
import {TabViewComponent} from '../../components/tabview/tabview.component';
import {TabPanelComponent} from '../../components/tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/tabview/tabviewdemo.component.html',
    directives: [TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class TabViewDemoComponent {

    activeTabIndex: number = 1;
}