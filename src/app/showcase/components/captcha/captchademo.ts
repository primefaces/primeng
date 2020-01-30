import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './captchademo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .ui-toast {
            top: 80px;
        }

        :host ::ng-deep .news-active .ui-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-toast {
                top: 110px;
            }

            :host ::ng-deep .news-active .ui-toast {
                top: 180px;
            }
        }
    `]
})
export class CaptchaDemo {
    
    constructor(private messageService: MessageService, private app: AppComponent) {}
    
    showResponse(event) {
        this.messageService.add({severity:'info', summary:'Success', detail: 'User Responsed',sticky: true});
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}
