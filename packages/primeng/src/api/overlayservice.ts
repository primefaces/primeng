import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessageOptions } from './toastmessage';

@Injectable({ providedIn: 'root' })
export class OverlayService {
    private clickSource = new Subject<ToastMessageOptions | ToastMessageOptions[]>();

    clickObservable = this.clickSource.asObservable();

    add(event: any) {
        if (event) {
            this.clickSource.next(event);
        }
    }
}
