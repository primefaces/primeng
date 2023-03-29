import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class IconService {
    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

    icons: any[];

    selectedIcon: any;

    apiUrl = 'assets/showcase/data/icons.json';

    getBaseUrl() {
        return `${this.document.location.protocol}//${this.document.location.host}/`;
    }

    getIcons() {
        const apiUrl = this.getBaseUrl() + this.apiUrl;

        return this.http.get(apiUrl).pipe(
            map((response: any) => {
                this.icons = response.icons;
                return this.icons;
            })
        );
    }
}
