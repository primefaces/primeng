import {Component,OnDestroy} from '@angular/core';
import {DialogService} from '../../../components/dynamicdialog/dialogservice';
import {MessageService} from 'primeng/api';
import {ProductListDemo} from './productlistdemo';
import { DynamicDialogRef } from '../../../components/dynamicdialog/dynamicdialog-ref';
import { Product } from '../../domain/product';

@Component({
    templateUrl: './dynamicdialogdemo.html',
    styleUrls: ['./dynamicdialogdemo.scss'],
    providers: [DialogService, MessageService]
})
export class DynamicDialogDemo implements OnDestroy {

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Choose a Product',
            width: '70%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((product: Product) =>{
            if (product) {
                this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
            }
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    public showPositionDialog(position: string) {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Choose a Product',
            width: '70%',
            contentStyle: { "max-height": "500px", "overflow": "auto" },
            baseZIndex: 10000,
            position
        });

        this.ref.onClose.subscribe((product: Product) =>{
            if (product) {
                this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
            }
        });
    }
}


