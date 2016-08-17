import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/panel/paneldemo.html'
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