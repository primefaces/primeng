import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {SplitButton} from '../../../components/splitbutton/splitbutton';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/splitbutton/splitbuttondemo.html',
    directives: [SplitButton,Growl,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class SplitButtonDemo {

    msgs: Message[] = [];

    save() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Saved'});
    }
    
    update() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Updated'});
    }
    
    delete() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Deleted'});
    }
}
