import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {SelectItem} from '../../../components/common/api';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablefilterdemo.html'
})
export class DataTableFilterDemo implements OnInit {

    cars: Car[];
    brands: SelectItem[] = [];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars =>{ 
            this.cars = cars;
            this.brands = [];
            this.brands.push({label:'', value:null})
            this.cars.forEach(car => {
                let selectItem:SelectItem = {label:car.brand, value:car.brand};
                this.addBrandIfNotExists(selectItem);
            })
        });
    }
    
    addBrandIfNotExists(item:SelectItem):void {
      let found = this.brands.some(function (elem:SelectItem) {
        return elem.label === item.label && elem.value === item.value ;
      });
      if (!found) { 
        this.brands.push(item); 
      }
    }
}