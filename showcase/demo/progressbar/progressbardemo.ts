import {Component,OnInit} from '@angular/core';
import {Messages} from '../../../components/messages/messages';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ProgressBar} from '../../../components/progressbar/progressbar';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {SelectItem} from '../../../components/common';
import {Message} from '../../../components/common';
import {Growl} from '../../../components/growl/growl';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/progressbar/progressbardemo.html',
    directives: [Messages,TabPanel,TabView,ProgressBar,CodeHighlighter,ROUTER_DIRECTIVES,Growl]
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