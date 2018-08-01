import {Component,OnInit} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './progressbardemo.html',
    providers: [MessageService]
})
export class ProgressBarDemo {

    value: number = 0;
    
    constructor(private messageService: MessageService) {}

    ngOnInit() {
        let interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if(this.value >= 100) {
                this.value = 100;
                this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
                clearInterval(interval);
            }
        }, 2000);
    }

}
