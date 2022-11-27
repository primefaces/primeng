import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UIKitService {
    constructor(private http: HttpClient) {}

    getPricingList() {
        return this.http.get<any>('https://www.primefaces.org/cdn/pricing/uikit.json');
    }
}
