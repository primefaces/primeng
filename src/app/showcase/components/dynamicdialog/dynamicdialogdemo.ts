import { Component, OnDestroy } from '@angular/core';
import { DialogService } from '../../../components/dynamicdialog/dialogservice';
import { MessageService } from 'primeng/api';
import { ProductListDemo } from './productlistdemo';
import { DynamicDialogRef } from '../../../components/dynamicdialog/dynamicdialog-ref';
import { Product } from '../../domain/product';

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    templateUrl: './dynamicdialogdemo.html',
    providers: [DialogService, MessageService]
})
export class DynamicDialogDemo implements OnDestroy {
    private destroy$: Subject<any> = new Subject<any>();
    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Choose a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((product: Product) => {
            if (product) {
                this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
            }
        });

        this.ref.onMaximize.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
        if (this.ref) {
            this.ref.close();
        }
    }
}
