import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';

@Component({
    templateUrl: './tablelazydemo.html'
})
export class TableLazyDemo implements OnInit {

    datasource: Customer[];

    customers: Customer[];

    totalRecords: number;

    cols: any[];

    loading: boolean;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        //datasource imitation
        this.customerService.getCustomersLarge().then(data => {
            this.datasource = data;
            this.totalRecords = data.length;
        });

        this.loading = true;
    }

    loadCustomers(event: LazyLoadEvent) {  
        this.loading = true;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            if (this.datasource) {
                this.customers = this.datasource.slice(event.first, (event.first + event.rows));
                this.loading = false;
            }
        }, 1000);
    }
    
}