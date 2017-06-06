import {Component,OnInit} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: './progressbardemo.html'
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