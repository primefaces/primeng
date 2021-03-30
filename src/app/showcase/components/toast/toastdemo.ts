import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './toastdemo.html',
    styleUrls: ['./toastdemo.scss'],
    providers: [MessageService]
    
})
export class ToastDemo {

    private latestMessage;

    constructor(private messageService: MessageService) {}

    showSuccess() {
        this.latestMessage = {severity:'success', summary: 'Success', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showInfo() {
        this.latestMessage = {severity:'info', summary: 'Info', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showWarn() {
        this.latestMessage = {severity:'warn', summary: 'Warn', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showError() {
        this.latestMessage = {severity:'error', summary: 'Error', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showCustom() {
        this.latestMessage = {severity:'custom', summary: 'Custom', detail: 'Message Content', icon: 'pi-file'};
        this.messageService.add(this.latestMessage);
    }

    showTopLeft() {
        this.latestMessage = {key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showTopCenter() {
        this.latestMessage = {key: 'tc', severity:'warn', summary: 'Warn', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showBottomCenter() {
        this.latestMessage = {key: 'bc', severity:'success', summary: 'Success', detail: 'Message Content'};
        this.messageService.add(this.latestMessage);
    }

    showConfirm() {
        this.latestMessage = {key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'};
        this.messageService.clear();
        this.messageService.add(this.latestMessage);
    }

    showMultiple() {
        this.latestMessage = {severity:'warn', summary:'Message 3', detail:'Message Content'};
        this.messageService.addAll([
            {severity:'success', summary:'Message 1', detail:'Message Content'},
            {severity:'info', summary:'Message 2', detail:'Message Content'},
            this.latestMessage
        ]);
    }

    showSticky() {
        this.latestMessage = {severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true};
        this.messageService.add(this.latestMessage);
    }

    onConfirm() {
        this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }
    
    clear() {
        this.messageService.clear();
    }

    removeLatestMessage() {
        if (this.latestMessage) {
            this.messageService.remove(this.latestMessage);
            this.latestMessage = null;
        }
    }
}