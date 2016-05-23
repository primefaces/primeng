import {Component} from '@angular/core';
import {Panel} from '../../../components/panel/panel';
import {SplitButton} from '../../../components/splitbutton/splitbutton';
import {SplitButtonItem} from '../../../components/splitbutton/splitbuttonitem';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Message} from '../../../components/api/message';
import {Growl} from '../../../components/growl/growl';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/panel/paneldemo.html',
    directives: [Panel,TabView,TabPanel,Growl,CodeHighlighter,SplitButton,SplitButtonItem,ROUTER_DIRECTIVES]
})
export class PanelDemo {

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