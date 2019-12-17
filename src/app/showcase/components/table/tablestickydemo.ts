import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './tablestickydemo.html',
    styles: [`
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 69px;
            box-shadow: 1px 3px 6px 0 rgba(32,33,36,0.10);
        }

        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 69px;
            box-shadow: 1px 3px 6px 0 rgba(32,33,36,0.10);
        }

        tr.news-active > th {
            top: 139px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-table .ui-table-thead > tr > th {
                top: 99px;
            }

            tr.news-active > th {
                top: 169px;
            }
        }
`]
})
export class TableStickyDemo implements OnInit {

    cars: Car[];

    cols: any[];

    constructor(private carService: CarService, private app: AppComponent) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}