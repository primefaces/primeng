import {Component} from 'angular2/core';
import {ToggleButton} from '../../components/togglebutton/togglebutton';
import {TabView} from '../../components/tabview/tabview';
import {TabPanel} from '../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'app/demo/togglebutton/togglebuttondemo.component.html',
    directives: [ToggleButton,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class ToggleButtonDemoComponent {
    
    checked1: boolean = false;

    checked2: boolean = true;
}