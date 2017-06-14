import { Http } from '@angular/http';
export declare class CountryService {
    private http;
    constructor(http: Http);
    getCountries(): Promise<any[]>;
}
