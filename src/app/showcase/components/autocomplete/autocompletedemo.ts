import { Component } from '@angular/core';
import { FilterService, SelectItemGroup } from 'primeng/api';
import { CountryService } from '../../service/countryservice';
@Component({
    templateUrl: './autocompletedemo.html'
})
export class AutoCompleteDemo {

    selectedCountry: any;

    selectedCity: any;

    selectedItem: any;

    countries: any[];

    items: any[];

    filteredCountries: any[];

    filteredItems: any[];

    selectedCountries: any[];

    selectedCountryAdvanced: any[];

    filteredBrands: any[];

    groupedCities: SelectItemGroup[];

    filteredGroups: any[];

    constructor(private countryService: CountryService, private filterService: FilterService) { }

    ngOnInit() {
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.groupedCities = [
            {
                label: 'Germany', value: 'de',
                items: [
                    {label: 'Berlin', value: 'Berlin'},
                    {label: 'Frankfurt', value: 'Frankfurt'},
                    {label: 'Hamburg', value: 'Hamburg'},
                    {label: 'Munich', value: 'Munich'}
                ]
            },
            {
                label: 'USA', value: 'us',
                items: [
                    {label: 'Chicago', value: 'Chicago'},
                    {label: 'Los Angeles', value: 'Los Angeles'},
                    {label: 'New York', value: 'New York'},
                    {label: 'San Francisco', value: 'San Francisco'}
                ]
            },
            {
                label: 'Japan', value: 'jp',
                items: [
                    {label: 'Kyoto', value: 'Kyoto'},
                    {label: 'Osaka', value: 'Osaka'},
                    {label: 'Tokyo', value: 'Tokyo'},
                    {label: 'Yokohama', value: 'Yokohama'}
                ]
            }
        ];

        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }
    }

    filterCountry(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    filterItems(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    filterGroupedCity(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.groupedCities) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredGroups = filteredGroups;
    }
}
