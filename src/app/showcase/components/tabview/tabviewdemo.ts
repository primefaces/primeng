import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: './tabviewdemo.html'
})
export class TabViewDemo {

    msgs: Message[];
    
    onTabChange(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }
}