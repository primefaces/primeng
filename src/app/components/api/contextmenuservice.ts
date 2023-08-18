import { Injectable } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import { Subject } from 'rxjs';

@Injectable()
export class ContextMenuService {
    private activeItemKeyChange = new Subject<string>();

    activeItemKeyChange$ = this.activeItemKeyChange.asObservable();

    activeItemKey: Nullable<string>;

    changeKey(key: string) {
        this.activeItemKey = key;
        this.activeItemKeyChange.next(this.activeItemKey as string);
    }

    reset() {
        this.activeItemKey = null;
        this.activeItemKeyChange.next(this.activeItemKey as any);
    }
}
