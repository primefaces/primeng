import { SelectItem } from './../../../components/common/selectitem';
import {Component} from '@angular/core';
import {CountryService} from '../../service/countryservice';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './autocompletedemo.html'
})
export class AutoCompleteDemo {

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

    filteredBrands: any[];

    brand: string;

    virtualScrollItems: string[];

    virtualScrollItem: string;

    selectedVirtualScrollItems: string[];

    constructor(private countryService: CountryService, private carService: CarService) { }

    filterCountrySingle(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });
    }

    filterCountryMultiple(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesMultiple = this.filterCountry(query, countries);
        });
    }

    filterVirtualScroll(event: {query: string}): void {
        const query = event.query.toLowerCase();
        this.carService.getCarsHuge()
            .then(cars => cars.map(car => `${car.color} ${car.brand} (${car.year})`))
            .then(cars => {
                this.virtualScrollItems = cars.filter(car => car.toLowerCase().includes(query));
            });
    }

    filterCountry(query, countries: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }
}
