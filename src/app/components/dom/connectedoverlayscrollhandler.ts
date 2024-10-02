import { Injectable } from '@angular/core';
import { DomHandler } from './domhandler';

export class ConnectedOverlayScrollHandler {
    private scrollableParents: any;

    constructor(private element: any, private listener: any = () => {}, private domHandler: DomHandler) {
    }

    bindScrollListener() {
        this.scrollableParents = this.domHandler.getScrollableParents(this.element);
        for (let i = 0; i < this.scrollableParents.length; i++) {
            this.scrollableParents[i].addEventListener('scroll', this.listener);
        }
    }

    unbindScrollListener() {
        if (this.scrollableParents) {
            for (let i = 0; i < this.scrollableParents.length; i++) {
                this.scrollableParents[i].removeEventListener('scroll', this.listener);
            }
        }
    }

    destroy() {
        this.unbindScrollListener();
        this.element = null;
        this.listener = null;
        this.scrollableParents = null;
    }
}

@Injectable({ providedIn: "root" })
export class ConnectedOverlayScrollHandlerFactory {
  constructor(private domHandler: DomHandler) {}

  create(element: any, listener: any = () => {}): ConnectedOverlayScrollHandler {
    return new ConnectedOverlayScrollHandler(element, listener, this.domHandler);
  }
}
