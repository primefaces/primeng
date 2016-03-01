import {Component,OnInit} from 'angular2/core';
import {Schedule} from '../../../components/schedule/schedule';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SelectItem} from '../../../components/api/selectitem';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/schedule/scheduledemo.html',
    directives: [Schedule,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ScheduleDemo implements OnInit {

    events: any[];

    ngOnInit() {
    }
}