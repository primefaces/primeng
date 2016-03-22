import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Injectable()
export class CountryService {
    
    constructor(private http: Http) {}

    getCountries() {
        return this.http.get('showcase/resources/data/countries.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }
}