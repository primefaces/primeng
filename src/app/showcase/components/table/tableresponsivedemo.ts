import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tableresponsivedemo.html',
    styles: [`
        :host ::ng-deep .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
            display: none;
        }

        @media screen and (max-width: 40em) {
            :host ::ng-deep .p-datatable.p-datatable-responsive-demo .p-datatable-thead > tr > th,
            :host ::ng-deep .p-datatable.p-datatable-responsive-demo .p-datatable-tfoot > tr > td {
                display: none !important;
            }

            :host ::ng-deep .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td {
                text-align: left;
                display: block;
                width: 100%;
                float: left;
                clear: left;
                border: 0 none;
            }

            :host ::ng-deep .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
                padding: .4rem;
                min-width: 30%;
                display: inline-block;
                margin: -.4em 1em -.4em -.4rem;
                font-weight: bold;
            }
        }
    `]
})
export class TableResponsiveDemo implements OnInit {

    cars: Car[];

    cols: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
}