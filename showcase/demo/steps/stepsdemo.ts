import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {MenuItem} from '../../../components/common/api';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/steps/stepsdemo.html',
    styles: [`
        .steps-basic .ui-steps-item {
            width: 25%;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class StepsDemo implements OnInit {

    private items: MenuItem[];
    
    msgs: Message[] = [];
    
    activeIndex: number = 1;

    ngOnInit() {
        this.items = [{
                label: 'Personal',
                command: (event: any) => {
                    this.activeIndex = 0;
                    this.msgs.length = 0;
                    this.msgs.push({severity:'info', summary:'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Seat',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity:'info', summary:'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Payment',
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity:'info', summary:'Pay with CC', detail: event.item.label});
                }
            },
            {
                label: 'Confirmation',
                command: (event: any) => {
                    this.activeIndex = 3;
                    this.msgs.length = 0;
                    this.msgs.push({severity:'info', summary:'Last Step', detail: event.item.label});
                }
            }
        ];
    }
}