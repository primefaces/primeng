import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './toastdemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            color: #ffffff;
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-close-icon {
            color: #ffffff;
        }

        :host ::ng-deep .top-toast {
            top: 80px;
        }

        :host ::ng-deep .news-active .top-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .top-toast {
                top: 110px;
            }

            :host ::ng-deep .news-active .top-toast {
                top: 180px;
            }
        }
    `],
    providers: [MessageService]
})
export class ToastDemo {

    constructor(private messageService: MessageService, private app: AppComponent) {}

    showSuccess() {
        this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
    }

    showInfo() {
        this.messageService.add({severity:'info', summary: 'Info Message', detail:'PrimeNG rocks'});
    }

    showWarn() {
        this.messageService.add({severity:'warn', summary: 'Warn Message', detail:'There are unsaved changes'});
    }

    showError() {
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    }

    showCustom() {
        this.messageService.add({key: 'custom', severity:'info', summary: 'Custom Toast', detail:'With a Gradient'});
    }

    showTopLeft() {
        this.messageService.add({key: 'tl', severity:'info', summary: 'Success Message', detail:'Order submitted'});
    }

    showTopCenter() {
        this.messageService.add({key: 'tc', severity:'warn', summary: 'Info Message', detail:'PrimeNG rocks'});
    }

    showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
    }

    showMultiple() {
        this.messageService.addAll([
            {severity:'info', summary:'Message 1', detail:'PrimeNG rocks'},
            {severity:'info', summary:'Message 2', detail:'PrimeUI rocks'},
            {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}
        ]);
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

    isNewsActive() {
        return this.app.newsActive;
    }
}