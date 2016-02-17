import {Component} from 'angular2/core';
import {InputSwitch} from '../../../components/inputswitch/inputswitch';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/inputswitch/inputswitch.html',
    directives: [InputSwitch,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class InputSwitchDemo {

    checked1: boolean = false;

    checked2: boolean = true;
}