import {Component} from 'angular2/core';
import {MegaMenu} from '../../../components/megamenu/megamenu';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/megamenu/megamenudemo.component.html',
    directives: [MegaMenu,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class MegaMenuDemoComponent {

}