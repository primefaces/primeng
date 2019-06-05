import {Component} from '@angular/core';
import {LazyLoadEvent, SelectItem} from '../../../components/common/api';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    templateUrl: './multiselectdemo.html',
    styles: [`
        :host ::ng-deep .ui-multiselected-item-token,
        :host ::ng-deep .ui-multiselected-empty-token {
            padding: 2px 4px;
            margin: 0 0.286em 0 0;
            display: inline-block;
            vertical-align:middle;
            height: 1.857em;
        }

        :host ::ng-deep .ui-multiselected-item-token {
            background: #007ad9;
            color: #ffffff;
        }

        :host ::ng-deep .ui-multiselected-empty-token {
            background: #d95f00;
            color: #ffffff;
        }
    `]
})
export class MultiSelectDemo {

    cars: SelectItem[];

    selectedCars1: string[] = [];

    selectedCars2: string[] = [];

    items: SelectItem[];

    lazyItems: SelectItem[];

    item: string;

    selectedItems: string[];

    constructor() {
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
            {label: 'Volvo', value: 'Volvo'},
        ];

        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }
        this.selectedItems = [this.items[100].value, this.items[200].value, this.items[300].value];
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
