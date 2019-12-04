import {Component} from '@angular/core';
import {DialogService} from '../../../components/dynamicdialog/dialogservice';
import {MessageService} from 'primeng/api';
import {CarsListDemo} from './carslistdemo';
import {Car} from '../../components/domain/car';

@Component({
    templateUrl: './dynamicdialogdemo.html',
    providers: [DialogService, MessageService]
})
export class DynamicDialogDemo {

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

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

}


