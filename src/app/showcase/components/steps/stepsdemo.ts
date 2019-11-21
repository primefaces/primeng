import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {MenuItem} from '../../../components/common/api';
import {MessageService} from '../../../components/common/messageservice';

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
            height: 10px;
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
    `],
    encapsulation: ViewEncapsulation.None
})
export class StepsDemo implements OnInit {

    items: MenuItem[];
    
    activeIndex: number = 1;
    
    constructor(private messageService: MessageService) {}

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
}
