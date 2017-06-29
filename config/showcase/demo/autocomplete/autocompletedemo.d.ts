import { CountryService } from '../service/countryservice';
export declare class AutoCompleteDemo {
    private countryService;
    country: any;
    countries: any[];
    filteredCountriesSingle: any[];
    filteredCountriesMultiple: any[];
    brands: string[];
    filteredBrands: any[];
    brand: string;
    constructor(countryService: CountryService);
    filterCountrySingle(event: any): void;
    filterCountryMultiple(event: any): void;
    filterCountry(query: any, countries: any[]): any[];
    filterBrands(event: any): void;
    handleDropdownClick(): void;
}
