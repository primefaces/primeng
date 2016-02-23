import {Component} from 'angular2/core';
import {MegaMenu} from '../../../components/megamenu/megamenu';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/megamenu/megamenudemo.html',
    directives: [MegaMenu,TabPanel,TabView,pCode,ROUTER_DIRECTIVES]
})
export class MegaMenuDemo {

}