import {Component} from 'angular2/core';
import {Menubar} from '../../../components/menubar/menubar';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/menubar/menubardemo.html',
    directives: [Menubar,TabPanel,TabView,pCode,ROUTER_DIRECTIVES]
})
export class MenubarDemo {

}