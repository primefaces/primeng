import {Component} from 'angular2/core';
import {Accordion} from '../../../components/accordion/accordion';
import {AccordionTab} from '../../../components/accordion/accordiontab';
import {Growl} from '../../../components/growl/growl';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Message} from '../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/accordion/accordiondemo.html',
    directives: [Accordion,AccordionTab,Growl,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class AccordionDemo {

    msgs: Message[];

    onTabClose(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index});
    }
    
    onTabOpen(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }
}