import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './accordiondemo.html',
    providers: [MessageService],
    styleUrls: ['./accordiondemo.scss']
})
export class AccordionDemo {
    
    activeState: boolean[] = [true, false, false];

    constructor(private messageService: MessageService) {}

    onTabClose(event) {
        this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
    }
    
    onTabOpen(event) {
        this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }

    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }
}