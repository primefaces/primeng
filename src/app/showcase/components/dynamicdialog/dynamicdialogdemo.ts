import {Component} from '@angular/core';
import {DialogService} from '../../../components/dynamicdialog/dialogservice';
import {MessageService} from 'primeng/api';
import {CarsListDemo} from './carslistdemo';
import {Car} from '../../components/domain/car';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './dynamicdialogdemo.html',
    providers: [DialogService, MessageService],
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
export class DynamicDialogDemo {

    constructor(public dialogService: DialogService, public messageService: MessageService, private app: AppComponent) {}

    show() {
        const ref = this.dialogService.open(CarsListDemo, {
            header: 'Choose a Car',
            width: '70%',
            contentStyle: {"max-height": "350px", "overflow": "auto"}
        });

        ref.onClose.subscribe((car: Car) =>{
            if (car) {
                this.messageService.add({severity:'info', summary: 'Car Selected', detail:'Vin:' + car.vin});
            }
        });
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}


