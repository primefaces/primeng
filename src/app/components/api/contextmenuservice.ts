import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ContextMenuService {

    private activeItemKeyChange = new Subject<string>();

    activeItemKeyChange$ = this.activeItemKeyChange.asObservable();

    activeItemKey: string;

    changeKey(key) {
        this.activeItemKey = key;
        this.activeItemKeyChange.next(this.activeItemKey);
    }

    reset() {
        this.activeItemKey = null;
        this.activeItemKeyChange.next(this.activeItemKey);
    }
}
