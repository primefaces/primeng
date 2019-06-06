import {Component} from '@angular/core';
import {LazyLoadEvent, SelectItem} from '../../../components/common/api';
import {SelectItemGroup} from '../../../components/common/api';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

interface City {
    name: string,
    code: string
}

@Component({
    templateUrl: './dropdowndemo.html',
})
export class DropdownDemo {

    cities: City[];

    selectedCity: string;

    cars: SelectItem[];

    selectedCar1: string;

    selectedCar2: string = 'BMW';
    
    selectedCar3: string;

    groupedCars: SelectItemGroup[];

    items: SelectItem[];

    lazyItems: SelectItem[];

    item: string;

    selectedLazy: SelectItem;

    filterValue: string;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }

        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.cars = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];

        this.groupedCars = [
            {
                label: 'Germany', value: 'germany.png', 
                items: [
                    {label: 'Audi', value: 'Audi'},
                    {label: 'BMW', value: 'BMW'},
                    {label: 'Mercedes', value: 'Mercedes'},
                    {label: 'Murcia', value: 'Murcia'}
                ]
            },
            {
                label: 'USA', value: 'usa.png', 
                items: [
                    {label: 'Cadillac', value: 'Cadillac'},
                    {label: 'Ford', value: 'Ford'},
                    {label: 'GMC', value: 'GMC'}
                ]
            },
            {
                label: 'Japan', value: 'japan.png', 
                items: [
                    {label: 'Honda', value: 'Honda'},
                    {label: 'Mazda', value: 'Mazda'},
                    {label: 'Toyota', value: 'Toyota'}
                ]
            }
        ];
        this.selectedLazy = this.items[43].value;
        this.filterValue =  this.items[43].label;
    }

    onLazyLoadEvent(event: LazyLoadEvent) {
        this.loadBatch(event).pipe(map(items => ({event, items}))).subscribe(res => {
            const {event, items} = res;
            this.lazyItems = [];
            for (let i = 0; i < items.length; i++) {
                this.lazyItems[event.first + i] = items[i];
            }
        });
    }

    loadBatch(event: LazyLoadEvent): Observable<SelectItem[]> {
        // simulate server response
        const res = [];
        let skipped = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (!event.globalFilter || (event.globalFilter && this.items[i].label.includes(event.globalFilter))) {
                if (skipped < event.first) {
                    skipped++;
                } else {
                    res.push({...this.items[i]});
                }
            }
            if (event.rows === res.length) {
                break;
            }
        }
        return of(res);
    }
}
