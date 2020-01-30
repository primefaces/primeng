import {Component,OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './progressbardemo.html',
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
export class ProgressBarDemo {

    value: number = 0;
    
    constructor(private messageService: MessageService, private app: AppComponent) {}

    ngOnInit() {
        let interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if(this.value >= 100) {
                this.value = 100;
                this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
                clearInterval(interval);
            }
        }, 2000);
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}
