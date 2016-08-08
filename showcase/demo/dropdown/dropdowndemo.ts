import {Component} from '@angular/core';
import {Dropdown} from '../../../components/dropdown/dropdown';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SelectItem} from '../../../components/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/dropdown/dropdown.html',
    directives: [Dropdown,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DropdownDemo {

    cities: SelectItem[];

    selectedCity: any;

    cars: SelectItem[];

    selectedCar: string;
    
    selectedCar2: string = 'BMW';

    constructor() {
        this.cities = [];
        this.cities.push({label:'Select City', value:null});
        this.cities.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
        this.cities.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}});
        this.cities.push({label:'London', value:{id:3, name: 'London', code: 'LDN'}});
        this.cities.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});

        this.cars = [];
        this.cars.push({label: 'Audi', value: 'Audi'});
        this.cars.push({label: 'BMW', value: 'BMW'});
        this.cars.push({label: 'Fiat', value: 'Fiat'});
        this.cars.push({label: 'Ford', value: 'Ford'});
        this.cars.push({label: 'Honda', value: 'Honda'});
        this.cars.push({label: 'Jaguar', value: 'Jaguar'});
        this.cars.push({label: 'Mercedes', value: 'Mercedes'});
        this.cars.push({label: 'Renault', value: 'Renault'});
        this.cars.push({label: 'VW', value: 'VW'});
        this.cars.push({label: 'Volvo', value: 'Volvo'});
    }
    
}