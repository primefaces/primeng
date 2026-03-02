import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverlayService {
    private clickSource = new Subject<any>();

    private realignSource = new Subject<Element>();

    clickObservable = this.clickSource.asObservable();

    realignObservable = this.realignSource.asObservable();

    add(event: any) {
        if (event) {
            this.clickSource.next(event);
        }
    }

    emitRealign(container: Element) {
        this.realignSource.next(container);
    }
}
