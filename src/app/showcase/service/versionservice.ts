import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VersionService {

    constructor(private http: HttpClient) { }

    getVersions() {
        return this.http.get<any>('https://www.primefaces.org/primeng/versions.json')
        .toPromise()
        .then(res => res.versions)
        .then(data => { return data; });
    }
}