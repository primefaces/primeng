import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './accordiondemo.html',
    providers: [MessageService]
})
export class AccordionDemo {
    
    index: number = -1;

    constructor(private messageService: MessageService) {}

    onTabClose(event) {
        this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
    }
    
    onTabOpen(event) {
        this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }

    toggle(index: number) {
        this.index = index === this.index ? -1 : index;
    }
}