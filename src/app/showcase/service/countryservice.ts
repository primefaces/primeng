import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries() {
    return this.http.get<any>('assets/showcase/data/countries.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
    }
}
