import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tablescrolldemo.html',
    styleUrls: ['./tablescrolldemo.css']
})
export class TableScrollDemo implements OnInit {

    customers: Customer[];

    dialogVisible: boolean;

    scrollableCols: any[];

    unlockedCustomers: any[];

    lockedCustomers: any[];

    balanceFrozen: boolean = false;

    rowGroupMetadata: any;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersMedium().then(data => {
            this.customers = data
        });
        this.customerService.getCustomersMedium().then(data => this.unlockedCustomers = data);

        this.lockedCustomers = [
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

        this.scrollableCols = [
            { field: 'name', header: 'Name' },
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

    toggleLock(data, frozen, index) {
        if (frozen) {
            this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
            this.unlockedCustomers.push(data);
        }
        else {
            this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
            this.lockedCustomers.push(data);
        }

        this.unlockedCustomers.sort((val1, val2) => {
            return val1.id < val2.id ? -1 : 1;
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

    formatCurrency(value) {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
}
