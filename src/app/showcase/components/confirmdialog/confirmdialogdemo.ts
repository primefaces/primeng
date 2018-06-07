import {Component} from '@angular/core';
import {ConfirmationService} from '../../../components/common/api';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: './confirmdialogdemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
    `],
    providers: [ConfirmationService]
})
export class ConfirmDialogDemo {
    
    msgs: Message[] = [];
    
    constructor(private confirmationService: ConfirmationService) {}

    confirm1() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }
    
    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }
}