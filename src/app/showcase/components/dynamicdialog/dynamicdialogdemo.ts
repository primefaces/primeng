import {Component,OnDestroy} from '@angular/core';
import {DialogService} from '../../../components/dynamicdialog/dialogservice';
import {MessageService} from 'primeng/api';
import {CarsListDemo} from './carslistdemo';
import {Car} from '../../components/domain/car';
import { DynamicDialogRef } from '../../../components/dynamicdialog/dynamicdialog-ref';

@Component({
    templateUrl: './dynamicdialogdemo.html',
    providers: [DialogService, MessageService]
})
export class DynamicDialogDemo implements OnDestroy {

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef;

    show() {
        this.ref = this.dialogService.open(CarsListDemo, {
            header: 'Choose a Car',
            width: '70%',
            contentStyle: {"max-height": "350px", "overflow": "auto"},
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((car: Car) =>{
            if (car) {
                this.messageService.add({severity:'info', summary: 'Car Selected', detail:'Vin:' + car.vin});
            }
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}


