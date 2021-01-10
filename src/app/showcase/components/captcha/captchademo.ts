import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './captchademo.html',
    providers: [MessageService]
})
export class CaptchaDemo {
    
    constructor(private messageService: MessageService) {}
    
    showResponse(event) {
        this.messageService.add({severity:'info', summary:'Success', detail: 'User Responsed',sticky: true});
    }

}
