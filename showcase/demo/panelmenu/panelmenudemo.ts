import {Component} from '@angular/core';
import {PanelMenu} from '../../../components/panelmenu/panelmenu';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/panelmenu/panelmenudemo.html',
    directives: [PanelMenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class PanelMenuDemo {
  
}