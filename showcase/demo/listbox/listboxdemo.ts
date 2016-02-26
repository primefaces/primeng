import {Component} from 'angular2/core';
import {Listbox} from '../../../components/listbox/listbox';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SelectItem} from '../../../components/api/selectitem';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/listbox/listboxdemo.html',
    directives: [Listbox,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ListboxDemo {

    cities: SelectItem[];

    selectedCity: string;

    selectedCities: string[];

    cars: SelectItem[];

    selectedCar: string = 'BMW';

    constructor() {
        this.cities = [];
        this.cities.push({label:'New York', value:'New York'});
        this.cities.push({label:'Rome', value:'Rome'});
        this.cities.push({label:'London', value:'London'});
        this.cities.push({label:'Istanbul', value:'Istanbul'});
        this.cities.push({label:'Paris', value:'Paris'});

        this.cars = [];
        this.cars.push({label: 'Audi', value: 'Audi'});
        this.cars.push({label: 'BMW', value: 'BMW'});
        this.cars.push({label: 'Fiat', value: 'Fiat'});
        this.cars.push({label: 'Ford', value: 'Ford'});
        this.cars.push({label: 'Honda', value: 'Honda'});
        this.cars.push({label: 'Jaguar', value: 'Jaguar'});
        this.cars.push({label: 'Mercedes', value: 'Mercedes'});
        this.cars.push({label: 'Renault', value: 'Renault'});
        this.cars.push({label: 'Volkswagen', value: 'Volkswagen'});
        this.cars.push({label: 'Volvo', value: 'Volvo'});
    }
}