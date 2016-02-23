import {Component} from 'angular2/core';
import {PanelMenu} from '../../../components/panelmenu/panelmenu';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/panelmenu/panelmenudemo.html',
    directives: [PanelMenu,TabPanel,TabView,pCode,ROUTER_DIRECTIVES]
})
export class PanelMenuDemo {
  
}