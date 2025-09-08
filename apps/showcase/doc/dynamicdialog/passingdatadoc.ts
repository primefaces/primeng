import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'passingdata-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                To pass data to a dynamically loaded component, you can use either the <i>data</i> or <i>inputValues</i> property, depending on your requirements. The <i>data</i> property is ideal for passing generic information that is not directly
                tied to the component's inputs, while <i>inputValues</i> allows you to set specific input properties on the component in a more structured and type-safe way.
            </p>
            <p>
                Both properties can be used together or independently, offering flexibility to meet different use cases. Additionally, the loaded component can control the dialog using the DynamicDialogRef API, providing complete control over the
                dialog lifecycle. Both DynamicDialogConfig and DynamicDialogRef are injectable through the constructor.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
    providers: [DialogService]
})
export class PassingDataDoc {
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
      		inputValues: {
        		selectedProduct: 'Laptop',
        		quantity: 2
      		},
            header: 'Select a Product'
        });
    }
}`
    };
}
