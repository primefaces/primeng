import {Component} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';

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
    
    openNext() {
        this.index = (this.index === 3) ? 0 : this.index + 1;
    }
    
    openPrev() {
        this.index = (this.index <= 0) ? 3 : this.index - 1;
    }
}