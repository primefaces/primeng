import { Observable, Subject } from 'rxjs';

export class DynamicDialogRef {
    constructor() {}

    close(result?: any) {
        this._onClose.next(result);
    }

    destroy() {
        this._onDestroy.next(null);
    }

    dragStart(event: MouseEvent) {
        this._onDragStart.next(event);
    }

    dragEnd(event: MouseEvent) {
        this._onDragEnd.next(event);
    }

    resizeInit(event: MouseEvent) {
        this._onResizeInit.next(event);
    }

    resizeEnd(event: MouseEvent) {
        this._onResizeEnd.next(event);
    }

    maximize(value: any) {
        this._onMaximize.next(value);
    }

    private readonly _onClose = new Subject<any>();
    onClose: Observable<any> = this._onClose.asObservable();

    private readonly _onDestroy = new Subject<any>();
    onDestroy: Observable<any> = this._onDestroy.asObservable();

    private readonly _onDragStart = new Subject<any>();
    onDragStart: Observable<any> = this._onDragStart.asObservable();

    private readonly _onDragEnd = new Subject<any>();
    onDragEnd: Observable<any> = this._onDragEnd.asObservable();

    private readonly _onResizeInit = new Subject<any>();
    onResizeInit: Observable<any> = this._onResizeInit.asObservable();

    private readonly _onResizeEnd = new Subject<any>();
    onResizeEnd: Observable<any> = this._onResizeEnd.asObservable();

    private readonly _onMaximize = new Subject<any>();
    onMaximize: Observable<any> = this._onMaximize.asObservable();
}
