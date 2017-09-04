import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../../components/domain/car';

@Injectable()
export class CarService {

  constructor(private http: HttpClient) { }

  getCarsSmall() {
    return this.http.get<any>('showcase/resources/data/cars-small.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
  }

  getCarsMedium() {
    return this.http.get<any>('showcase/resources/data/cars-medium.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
  }

  getCarsLarge() {
    return this.http.get<any>('showcase/resources/data/cars-large.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
  }
}
