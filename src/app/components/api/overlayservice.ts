import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message';

@Injectable({ providedIn: 'root' })
export class OverlayService {
    private clickSource = new Subject<Message | Message[]>();

    clickObservable = this.clickSource.asObservable();

    add(event: any) {
        if (event) {
            this.clickSource.next(event);
        }
    }
}
