import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    template: `
        <div>
            <p>
                There are <strong>{{ totalProducts }}</strong> products in total in this list.
            </p>
            <div class="flex justify-content-end">
                <p-button type="button" label="Close" (click)="close()"></p-button>
            </div>
        </div>
    `
})
export class InfoDemo implements OnInit {
    totalProducts: number = 0;

    constructor(public ref: DynamicDialogRef, private dialogService: DialogService) {}

    ngOnInit() {
        const instance = this.dialogService.dialogComponentRefMap.get(this.ref).instance;
        if (instance && instance.data) {
            this.totalProducts = instance.data['totalProducts'];
        }
    }

    close() {
        this.ref.close();
    }
}
