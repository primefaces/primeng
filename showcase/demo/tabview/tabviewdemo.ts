import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/tabview/tabviewdemo.html'
})
export class TabViewDemo {

    msgs: Message[];

    closeGuard = (event) => {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'This tab is guarded and cannot be closed', detail: 'Index: ' + event.index});
        return false;
    }

    onTabChange(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }
}