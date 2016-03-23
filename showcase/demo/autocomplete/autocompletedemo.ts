import {Component} from 'angular2/core';
import {AutoComplete} from '../../../components/autocomplete/autocomplete';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {CountryService} from '../service/countryservice';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    templateUrl: 'showcase/demo/autocomplete/autocompletedemo.html',
    directives: [AutoComplete,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CountryService]
})
export class AutoCompleteDemo {

    country: any;
        
    filteredCountries: any[];
    
    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
    
    filteredBrands: any[];
    
    brand: string;
    
    constructor(private countryService: CountryService) { }
    
    filterCountry(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        this.countryService.getCountries().then(countries => {
            this.filteredCountries = [];
            for(let i = 0; i < countries.length; i++) {
                let country = countries[i];
                if(country.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.filteredCountries.push(country);
                }
            }
        });
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
    
    handleDropdownClick() {
        this.filteredBrands = this.brands;
    }
}