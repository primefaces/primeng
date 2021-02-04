import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tablescrolldemo.html'
})
export class TableScrollDemo implements OnInit {

    customers: Customer[];

    frozenValue: Customer[];
    
    dialogVisible: boolean;

    scrollableCols: any[];

    frozenCols: any[];

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(data => this.customers = data);

        this.frozenValue = [
            {
                id: 1255,
                name: "James McAdams",
                country: {
                    name: "United States",
                    code: "us"
                },
                company: "McAdams Consulting Ltd",
                date: "2014-02-13",
                status: "qualified",
                activity: 23,
                representative: {
                    name: "Ioni Bowcher",
                    image: "ionibowcher.png"
                }
            },
            {
                id: 5135,
                name: "Geraldine Bisset",
                country: {
                    name: "France",
                    code: "fr"
                },
                company: "Bisset Group",
                status: "proposal",
                date: "2019-05-05",
                activity: 0,
                representative: {
                    name: "Amy Elsner",
                    image: "amyelsner.png"
                }
            }
        ];

        this.frozenCols = [
            { field: 'name', header: 'Name' }
        ];

        this.scrollableCols = [
            { field: 'id', header: 'Id' },
            { field: 'date', header: 'Date' },
            { field: 'company', header: 'Company' },
            { field: 'status', header: 'Status' },
            { field: 'activity', header: 'Activity' }
        ];
    }

    showDialog() {
        this.dialogVisible = true;
    }
}