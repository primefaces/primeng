import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Code } from '../../domain/code';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'customization-doc',
    template: `
        <app-docsectiontext>
        <p>DynamicDialog uses the Dialog component internally, visit <a [routerLink]="'/dialog'">dialog</a> for more information about the available props.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
    providers: [DialogService]
})
export class CustomizationDoc {
    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Select a Product',
            width: '50vw',
            modal:true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
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
export class CustomizationDemo {

    ref: DynamicDialogRef | undefined;
    
    constructor(public dialogService: DialogService) {}
    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Select a Product',
            width: '50vw',
            modal:true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });
}`
    };
}
