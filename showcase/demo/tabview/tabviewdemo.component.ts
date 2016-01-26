import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/tabview/tabviewdemo.component.html',
    directives: [TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class TabViewDemoComponent {

    activeTabIndex: number = 1;
}