import {Component} from '@angular/core';
import {Growl} from '../../../components/growl/growl';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Message} from '../../../components/common';

@Component({
    templateUrl: 'showcase/demo/accordion/accordiondemo.html',
    directives: [Growl,TabView,TabPanel,CodeHighlighter]
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