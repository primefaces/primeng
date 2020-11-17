import {Component} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
    templateUrl: './confirmdialogdemo.html',
    providers: [ConfirmationService,MessageService]
})
export class ConfirmDialogDemo {
    
    position: string;
    
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm1() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            },
            reject: () => {
                this.messageService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
            }
        });
    }
    
    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            },
            reject: () => {
                this.messageService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
            }
        });
    }

    confirmPosition(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            },
            reject: () => {
                this.messageService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
            },
            key: "positionDialog"
        });
    }
}