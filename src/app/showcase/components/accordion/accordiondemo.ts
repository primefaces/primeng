import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './accordiondemo.html',
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
export class AccordionDemo {
    
    index: number = -1;

    constructor(private messageService: MessageService, private app: AppComponent) {}

    onTabClose(event) {
        this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
    }
    
    onTabOpen(event) {
        this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }
    
    openNext() {
        this.index = (this.index === 3) ? 0 : this.index + 1;
    }
    
    openPrev() {
        this.index = (this.index <= 0) ? 3 : this.index - 1;
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}