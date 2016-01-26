import {Component} from 'angular2/core';
import {Panel} from '../../components/panel/panel';
import {TabView} from '../../components/tabview/tabview';
import {TabPanel} from '../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/panel/paneldemo.component.html',
    directives: [Panel,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class PanelDemoComponent {

}