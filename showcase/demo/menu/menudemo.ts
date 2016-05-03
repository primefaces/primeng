import {Component} from '@angular/core';
import {Menu} from '../../../components/menu/menu';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/menu/menudemo.html',
    directives: [Menu,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class MenuDemo {

}