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
            top: 69px;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 139px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
                top: 99px;
            }

            .layout-news-active :host ::ng-deep .p-datatable tr > th {
                top: 169px;
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