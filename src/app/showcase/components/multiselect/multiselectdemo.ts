import {Component} from '@angular/core';
import {LazyLoadEvent, SelectItem} from 'primeng/api';
import { CountryService } from '../../service/countryservice';
import {Observable, of} from 'rxjs';

@Component({
    templateUrl: './multiselectdemo.html',
    styleUrls: ['./multiselectdemo.scss']
})
export class MultiSelectDemo {

    selectedCities: string[] = [];

    selectedCountries1: string[] = [];

    selectedCountries2: string[] = [];

    items: SelectItem[];

    lazyItems: SelectItem[];

    item: string;

    cities: any[];

    countries: any[];

    countries2: SelectItem[];

    selectedItems: string[];

    constructor(private countryService: CountryService) {
        
        this.items = [];

        this.countryService.getCountries().then(countries => {
            this.countries2 = countries;
        });

        this.countries = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ];

        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }
        this.items[200].disabled = true;
        this.selectedItems = [this.items[100].value, this.items[200].value, this.items[300].value];
    }

    onLazyLoadEvent(event: LazyLoadEvent) {
        this.loadBatch(event).subscribe(res => {
            this.lazyItems = res;
        });
    }

    loadBatch(event: LazyLoadEvent): Observable<SelectItem[]> {
        // simulate server response
        const res = [];
        for (let i = 0; i < this.items.length; i++) {
            if (!event.globalFilter || (event.globalFilter && this.items[i].label.includes(event.globalFilter))) {
                res.push({...this.items[i]});
            }
            if (event.rows === res.length) {
                break;
            }
        }
        return of(res);
    }
}
