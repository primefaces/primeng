import {Component} from 'angular2/core';
import {Spinner} from '../../components/spinner/spinner';
import {Button} from '../../components/button/button';
import {TabView} from '../../components/tabview/tabview';
import {TabPanel} from '../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/spinner/spinnerdemo.component.html',
    directives: [Spinner,Button,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class SpinnerDemoComponent {

    val1: number;

    val2: number;

    val3: number;

   val4: number = 100;
}