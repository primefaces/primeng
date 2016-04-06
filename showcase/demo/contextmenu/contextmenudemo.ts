import {Component} from 'angular2/core';
import {ContextMenu} from '../../../components/contextmenu/contextmenu';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/contextmenu/contextmenudemo.html',
    directives: [ContextMenu,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ContextMenuDemo {

}