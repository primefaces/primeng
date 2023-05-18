import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Nullable } from '../ts-helpers';

@Injectable()
export class ContextMenuService {
    private activeItemKeyChange = new Subject<string>();

    activeItemKeyChange$ = this.activeItemKeyChange.asObservable();

    activeItemKey: Nullable<string>;

    changeKey(key: string) {
        this.activeItemKey = key;
        this.activeItemKeyChange.next(this.activeItemKey!);
    }

    reset() {
        this.activeItemKey = null;
        this.activeItemKeyChange.next(this.activeItemKey!);
    }
}
