import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tabledemo.html',
    styleUrls: ['./tabledemo.scss']
})
export class TableDemo implements OnInit {

    customers: Customer[];

    selectedCustomers: Customer[];

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => this.customers = customers);
    }
}