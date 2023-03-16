import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Version {
    name: string;
    url: string;
    version: string;
}

@Injectable()
export class JsonService {
    constructor(private http: HttpClient) {}

    getVersions() {
        return this.http
            .get<any>('./versions.json')
            .toPromise()
            .then((res) => <Version[]>res.versions)
            .then((data) => {
                return data;
            });
    }

    getAnnouncement() {
        return this.http
            .get<any>('https://www.primefaces.org/cdn/news/primeng.json')
            .toPromise()
            .then((data) => {
                return data;
            });
    }
}
