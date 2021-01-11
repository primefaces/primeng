import {Component, OnInit} from '@angular/core';
import {Message,MessageService} from 'primeng/api';

@Component({
    templateUrl: './messagesdemo.html',
    providers: [MessageService],
    styleUrls: ['./messagesdemo.css']
})
export class MessagesDemo implements OnInit {

    msgs1: Message[];

    msgs2: Message[];
    
    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.msgs1 = [
            {severity:'success', summary:'Success', detail:'Message Content'},
            {severity:'info', summary:'Info', detail:'Message Content'},
            {severity:'warn', summary:'Warning', detail:'Message Content'},
            {severity:'error', summary:'Error', detail:'Message Content'},
            {severity:'custom', summary:'Custom', detail:'Message Content', icon: 'pi-file'}
        ];
    }
    
    addMessages() {
        this.msgs2 = [
            {severity:'success', summary:'Success', detail:'Message Content'},
            {severity:'info', summary:'Info', detail:'Message Content'},
            {severity:'warn', summary:'Warning', detail:'Message Content'},
            {severity:'error', summary:'Error', detail:'Message Content'}
        ];
    }

    clearMessages() {
        this.msgs2 = [];
    }

    showViaService() {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }
}