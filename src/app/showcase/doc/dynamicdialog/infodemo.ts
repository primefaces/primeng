import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../service/productservice';

@Component({
    template: ` 
     <div>
        <p>
            There are <strong>{{ totalProducts }}</strong> products in total in this list.
        </p>
        <div class="flex justify-content-end">
            <button autofocus type="button" label="Close" click="closeDialog"></button>
        </div>
    </div>
     `
})
export class InfoDemo implements OnInit {
    totalProducts : number = 0

    constructor(private productService: ProductService, public ref: DynamicDialogRef, private dialogService: DialogService) {}

    ngOnInit() {
     
      
    }

  
}
