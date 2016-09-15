import {Component} from '@angular/core';
import {ConfirmationService} from '../../../components/common/api';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/confirmdialog/confirmdialogdemo.html',
    providers: [ConfirmationService]
})
export class ConfirmDialogDemo {
    
    msgs: Message[] = [];
    
    constructor(private confirmationService: ConfirmationService) {}

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.msgs = [];
                this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });
    }
}