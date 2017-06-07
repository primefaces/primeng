import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountryService {
    
    constructor(private http: Http) {}

    getCountries() {
        return this.http.get('assets/showcase/data/countries.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }
}