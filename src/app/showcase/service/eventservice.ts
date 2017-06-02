import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    
    constructor(private http: Http) {}

    getEvents() {
        return this.http.get('assets/showcase/data/scheduleevents.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }
}