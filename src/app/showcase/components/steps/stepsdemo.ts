import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './stepsdemo.html',
    providers: [MessageService],
    styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }
        
        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            padding: 0 1em;
            overflow: visible;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }

        .steps-demo .ui-toast {
            top: 80px;
        }

        .news-active.steps-demo .ui-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            .steps-demo .ui-toast {
                top: 110px;
            }

            .news-active.steps-demo .ui-toast {
                top: 180px;
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class StepsDemo implements OnInit {

    items: MenuItem[];
    
    activeIndex: number = 1;
    
    constructor(private messageService: MessageService, private app: AppComponent) {}

    ngOnInit() {
        this.items = [{
                label: 'Personal',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Seat',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Payment',
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
                }
            },
            {
                label: 'Confirmation',
                command: (event: any) => {
                    this.activeIndex = 3;
                    this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
                }
            }
        ];
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}
