import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Code } from '../../domain/code';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'passingdata-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                In case you need to pass data to the component that is dynamically loaded, use the <i>data</i> property that can be access using the DynamicDialogConfig class. In additon, the loaded component can also control the Dialog using the
                DynamicDialogRef API. Both the DynamicDialogConfig and DynamicDialogRef are injectable using the constructor.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`,
    providers: [DialogService]
})
export class PassingDataDoc {
    @Input() id: string;

    @Input() title: string;

    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            data: {
                id: '51gF3'
            },
            header: 'Select a Product'
        });
    }

    code: Code = {
        typescript: `
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './productlistdemo';

@Component({
    templateUrl: './dynamicdialogdemo.html',
    providers: [DialogService]
})
export class DynamicDialogDemo {

    ref: DynamicDialogRef | undefined;
    
    constructor(public dialogService: DialogService) {}

    show() {
        this.ref = this.dialogService.open(ProductListDemo, { 
            data: {
                id: '51gF3'
            },
            header: 'Select a Product'
        });
    }
}`
    };
}
