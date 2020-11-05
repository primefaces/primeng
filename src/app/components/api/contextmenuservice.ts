import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DomHandler } from '../dom/domhandler';

@Injectable()
export class ContextMenuService {

    private activeIndexChange = new Subject<string>();

    activeIndexChange$ = this.activeIndexChange.asObservable();
    
    activeIndex: string;

    activeMenuItem: any;

    changeActiveMenuItem(item, submenuClosed?) {
        if (!submenuClosed) {
            DomHandler.removeClass(item, 'p-submenu-closed');
        } 
        else {
            DomHandler.addClass(item, "p-submenu-closed");
        }

        this.activeMenuItem = item;
        this.activeIndex = this.activeMenuItem.getAttribute('data-itemindex');
        this.activeIndexChange.next(this.activeIndex);
    }

    resetActiveMenuItem() {
        this.activeMenuItem = null;
        this.activeIndex = null;
        this.activeIndexChange.next(this.activeIndex);
    }
}