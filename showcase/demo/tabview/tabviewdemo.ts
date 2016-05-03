import {Component} from '@angular/core';
import {TabView} from '../../../components/tabview/tabview';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/tabview/tabviewdemo.html',
    directives: [TabView,TabPanel,Growl,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class TabViewDemo {

    msgs: Message[];
    
    onTabChange(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }
}