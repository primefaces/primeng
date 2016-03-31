import {Component} from 'angular2/core';
import {GMap} from '../../../components/gmap/gmap';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/gmap/gmapdemo.html',
    directives: [GMap,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GMapDemo {

}