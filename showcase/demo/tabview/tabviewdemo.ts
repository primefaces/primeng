import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';
import { TabButton } from '../../../components/tabview/tabview';

@Component({
    templateUrl: 'showcase/demo/tabview/tabviewdemo.html'
})
export class TabViewDemo {

    msgs: Message[];

    buttons: TabButton[] = [
        {
            action: () => {
                this.msgs = [];
                this.msgs.push({severity:'info', summary:'Add Button Clicked'});
            },
            rightIcon: 'fa-plus-circle fa-lg',
        }
    ];

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