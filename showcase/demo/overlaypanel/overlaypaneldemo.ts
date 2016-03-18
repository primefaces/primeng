import {Component} from 'angular2/core';
import {OverlayPanel} from '../../../components/overlaypanel/overlaypanel';
import {Button} from '../../../components/button/button';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/overlaypanel/overlaypaneldemo.html',
    directives: [OverlayPanel,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class OverlayPanelDemo {

}