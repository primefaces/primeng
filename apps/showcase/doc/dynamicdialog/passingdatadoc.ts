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
                In case you need to pass data to the component that is dynamically loaded, you can use either the <i>data</i> or the <i>inputValues</i> property depending on your requirements.
            </p>
			<ul>
                <li>
					The data property can be accessed using the DynamicDialogConfig class and is ideal for passing generic data that is not directly tied to the component’s inputs.
                </li>
                <li>
					The inputValues property, on the other hand, is designed for setting specific input properties on the loaded component in a structured and type-safe way.
                </li>
			</ul>
			<p>
				Both approaches can be used independently or together, allowing for greater flexibility in how you provide data to dynamically loaded components. In addition, the loaded component can also control the Dialog using the DynamicDialogRef API. Both the DynamicDialogConfig and DynamicDialogRef are injectable using the constructor.
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
