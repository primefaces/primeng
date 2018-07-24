import {Component} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './notifydemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
    `],
    providers: [MessageService]
})
export class NotifyDemo {

    constructor(private messageService: MessageService) {}

    showSuccess() {
        this.messageService.add({severity:'success', summary:'Success Message', detail:'Order submitted'});
    }

    showInfo() {
        this.messageService.add({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
    }

    showWarn() {
        this.messageService.add({severity:'warn', summary:'Warn Message', detail:'There are unsaved changes'});
    }

    showError() {
        this.messageService.add({severity:'error', summary:'Error Message', detail:'Validation failed'});
    }

    showMultiple() {
        this.messageService.addAll([
            {severity:'info', summary:'Message 1', detail:'PrimeNG rocks'},
            {severity:'info', summary:'Message 2', detail:'PrimeUI rocks'},
            {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}
        ]);
    }
    
    clear() {
        this.messageService.clear();
    }
}