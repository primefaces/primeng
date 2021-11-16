import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tablestickydemo.html',
    styleUrls: ['./tabledemo.scss'],
    styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 0;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
                top: 0;
            }

            .layout-news-active :host ::ng-deep .p-datatable tr > th {
                top: 0;
            }
        }
    `]
})
export class TableStickyDemo implements OnInit {

    customers: Customer[];

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => this.customers = customers);
    }

}
