import {Component} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/dragdrop/dragdropdemo.html',
    styles: [`
        .ui-grid li {
            list-style-type: none;
            padding: 10px;
            margin-bottom: 5px;
        }
    `]
})
export class DragDropDemo {
    
    availableCars: Car[];
    
    selectedCars: Car[];
    
    draggedCar: Car;
    
    constructor(private carService: CarService) { }
    
    ngOnInit() {
        this.selectedCars = [];
        this.carService.getCarsSmall().then(cars => this.availableCars = cars);
    }
    
    dragStart(event,car: Car) {
        this.draggedCar = car;
    }
    
    drop(event) {
        if(this.draggedCar) {
            this.selectedCars.push(this.draggedCar);
            this.availableCars.splice(this.findIndex(this.draggedCar), 1);
            this.draggedCar = null;
        }
    }
    
    dragEnd(event) {
        this.draggedCar = null;
    }
    
    findIndex(car: Car) {
        let index = -1;
        for(let i = 0; i < this.availableCars.length; i++) {
            if(car.vin === this.availableCars[i].vin) {
                index = i;
                break;
            }
        }
        return index;
    }

}