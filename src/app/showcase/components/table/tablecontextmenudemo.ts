import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { MenuItem } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './tablecontextmenudemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .ui-toast {
            top: 80px;
        }

        :host ::ng-deep .news-active .ui-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-toast {
                top: 110px;
            }

            :host ::ng-deep .news-active .ui-toast {
                top: 180px;
            }
        }
    `]
})
export class TableContextMenuDemo implements OnInit {

    cars: Car[];

    cols: any[];

    selectedCar: Car;

    selectCars: Car[];

    items: MenuItem[];

    constructor(private carService: CarService, private messageService: MessageService, private app: AppComponent) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedCar) },
            { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteCar(this.selectedCar) }
        ];
    }

    viewCar(car: Car) {
        this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand });
    }

    deleteCar(car: Car) {
        let index = -1;
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].vin == car.vin) {
                index = i;
                break;
            }
        }
        this.cars.splice(index, 1);
        
        this.messageService.add({ severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand });
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}
