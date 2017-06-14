import { Http } from '@angular/http';
export declare class EventService {
    private http;
    constructor(http: Http);
    getEvents(): Promise<any[]>;
}
