import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonService {

    constructor(private http: HttpClient) { }

    getVersions() {
        return this.http.get<any>('https://www.primefaces.org/primeng/versions.json', {headers:new HttpHeaders({'cache': 'no-store'})})
        .toPromise()
        .then(res => res.versions)
        .then(data => { return data; });
    }

    getAnnouncement() {
        return this.http.get<any>('https://www.primefaces.org/cdn/news/primeng.json', {headers:new HttpHeaders({'cache': 'no-store'})})
        .toPromise()
        .then(data => { return data; });
    }
}