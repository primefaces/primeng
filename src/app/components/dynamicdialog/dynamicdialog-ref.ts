import { Observable, Subject } from 'rxjs';
/**
 * Dynamic Dialog instance.
 * @group Components
 */
export class DynamicDialogRef {
    constructor() {}
    /**
     * Closes dialog.
     * @group Method
     */
    close(result?: any) {
        this._onClose.next(result);

        setTimeout(() => {
            this._onClose.complete();
        }, 1000)
    }
    /**
     * Destroys the dialog instance.
     * @group Method
     */
    destroy() {
        this._onDestroy.next(null);
    }
    /**
     * Callback to invoke on drag start.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    dragStart(event: MouseEvent) {
        this._onDragStart.next(event);
    }
    /**
     * Callback to invoke on drag end.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    dragEnd(event: MouseEvent) {
        this._onDragEnd.next(event);
    }
    /**
     * Callback to invoke on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    resizeInit(event: MouseEvent) {
        this._onResizeInit.next(event);
    }
    /**
     * Callback to invoke on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    resizeEnd(event: MouseEvent) {
        this._onResizeEnd.next(event);
    }
    /**
     * Callback to invoke on dialog is maximized.
     * @param {*} value - Size value.
     * @group Method
     */
    maximize(value: any) {
        this._onMaximize.next(value);
    }

    private readonly _onClose = new Subject<any>();
    /**
     * Event triggered on dialog is closed.
     * @group Events
     */
    onClose: Observable<any> = this._onClose.asObservable();

    private readonly _onDestroy = new Subject<any>();
    /**
     * Event triggered on dialog instance is destroyed.
     * @group Events
     */
    onDestroy: Observable<any> = this._onDestroy.asObservable();

    private readonly _onDragStart = new Subject<any>();
    /**
     * Event triggered on drag start.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onDragStart: Observable<any> = this._onDragStart.asObservable();

    private readonly _onDragEnd = new Subject<any>();
    /**
     * Event triggered on drag end.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onDragEnd: Observable<any> = this._onDragEnd.asObservable();

    private readonly _onResizeInit = new Subject<any>();
    /**
     * Event triggered on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onResizeInit: Observable<any> = this._onResizeInit.asObservable();

    private readonly _onResizeEnd = new Subject<any>();
    /**
     * Event triggered on resize end.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onResizeEnd: Observable<any> = this._onResizeEnd.asObservable();

    private readonly _onMaximize = new Subject<any>();
    /**
     * Event triggered on resize end.
     * @param {*} value - Size value.
     * @group Events
     */
    onMaximize: Observable<any> = this._onMaximize.asObservable();
}
