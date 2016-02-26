import {Component} from 'angular2/core';
import {ToggleButton} from '../../../components/togglebutton/togglebutton';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/togglebutton/togglebuttondemo.html',
    directives: [ToggleButton,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ToggleButtonDemo {
    
    checked1: boolean = false;

    checked2: boolean = true;
}