import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tablerowgroupdemo.html'
})
export class TableRowGroupDemo implements OnInit {

    customers: Customer[];

    rowGroupMetadata: any;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersMedium().then(data => {
            this.customers = data;
            this.updateRowGroupMetaData();
        });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers) {
            for (let i = 0; i < this.customers.length; i++) {
                let rowData = this.customers[i];
                let representativeName = rowData.representative.name;
                
                if (i == 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    let previousRowData = this.customers[i - 1];
                    let previousRowGroup = previousRowData.representative.name;
                    if (representativeName === previousRowGroup)
                        this.rowGroupMetadata[representativeName].size++;
                    else
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                }
            }
        }
    }
   
}