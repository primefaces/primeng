import {Component,OnInit} from 'angular2/core';
import {Messages} from '../../../components/messages/messages';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ProgressBar} from '../../../components/progressbar/progressbar';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {SelectItem} from '../../../components/api/selectitem';
import {Message} from '../../../components/api/message';
import {Growl} from '../../../components/growl/growl';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/progressbar/progressbardemo.html',
    directives: [Messages,TabPanel,TabView,ProgressBar,pCode,ROUTER_DIRECTIVES,Growl]
})
export class ProgressBarDemo {

    value: number = 0;

    msgs: Message[];

    ngOnInit() {
        let interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if(this.value >= 100) {
                this.value = 100;
                this.msgs = [{severity: 'info', summary: 'Success', detail: 'Process Completed'}];
                clearInterval(interval);
            }
        }, 2000);
    }

}