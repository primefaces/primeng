import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './tabviewdemo.html',
    providers: [MessageService]
})
export class TabViewDemo {
    
    constructor(private messageService: MessageService, private app: AppComponent) {}
    
    onTabChange(event) {
        this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }

}
