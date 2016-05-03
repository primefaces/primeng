import {Component} from '@angular/core';
import {SlideMenu} from '../../../components/slidemenu/slidemenu';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/slidemenu/slidemenudemo.html',
    directives: [SlideMenu,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class SlideMenuDemo {

}