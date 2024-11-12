import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverlayService {
    private clickSource = new Subject<any>();

    clickObservable = this.clickSource.asObservable();

    add(event: any) {
        if (event) {
            this.clickSource.next(event);
        }
    }
}
