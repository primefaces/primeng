import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tablerowgroupdemo.html',
    styleUrls: ['./tablerowgroupdemo.scss']
})
export class TableRowGroupDemo implements OnInit {

    customers: Customer[];

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersMedium().then(data => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }

        return total;
    }
}
