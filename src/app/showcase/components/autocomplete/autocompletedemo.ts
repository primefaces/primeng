import {Component} from '@angular/core';
import {CountryService} from '../../service/countryservice';

@Component({
    templateUrl: './autocompletedemo.html'
})
export class AutoCompleteDemo {

    selectedCountry: any;
    
    countries: any[];
        
    filteredCountries: any[];

    selectedCountries: any[];
    
    selectedCountryAdvanced: any[];
    
    filteredBrands: any[];
    
    constructor(private countryService: CountryService) { }
    
    ngOnInit() {        
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
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
}