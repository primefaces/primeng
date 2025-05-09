import { Observable, Subject } from 'rxjs';
import { Output, EventEmitter, Type } from '@angular/core';
/**
 * Dynamic Dialog instance.
 * @group Components
 */
export class DynamicDialogRef<ComponentType = any, CloseResult = any, MaximizeResult = any> {
    /**
     * Closes dialog.
     * @group Method
     */
    close(result?: CloseResult) {
        this._onClose.next(result);

        setTimeout(() => {
            this._onClose.complete();
        }, 1000);
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
    maximize(value: MaximizeResult) {
        this._onMaximize.next(value);
    }

    private readonly _onClose = new Subject<CloseResult>();
    /**
     * Event triggered on dialog is closed.
     * @group Events
     */
    onClose: Observable<CloseResult> = this._onClose.asObservable();

    private readonly _onDestroy = new Subject<null>();
    /**
     * Event triggered on dialog instance is destroyed.
     * @group Events
     */
    onDestroy: Observable<null> = this._onDestroy.asObservable();

    private readonly _onDragStart = new Subject<MouseEvent>();
    /**
     * Event triggered on drag start.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onDragStart: Observable<MouseEvent> = this._onDragStart.asObservable();

    private readonly _onDragEnd = new Subject<MouseEvent>();
    /**
     * Event triggered on drag end.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onDragEnd: Observable<MouseEvent> = this._onDragEnd.asObservable();

    private readonly _onResizeInit = new Subject<MouseEvent>();
    /**
     * Event triggered on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onResizeInit: Observable<MouseEvent> = this._onResizeInit.asObservable();

    private readonly _onResizeEnd = new Subject<MouseEvent>();
    /**
     * Event triggered on resize end.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onResizeEnd: Observable<MouseEvent> = this._onResizeEnd.asObservable();

    private readonly _onMaximize = new Subject<MaximizeResult>();
    /**
     * Event triggered on dialog is maximized.
     * @param {*} value - Size value.
     * @group Events
     */
    onMaximize: Observable<MaximizeResult> = this._onMaximize.asObservable();

    /**
     * Event triggered on child component load.
     * @param {*} value - Chi.
     * @group Events
     */
    readonly onChildComponentLoaded = new Subject<ComponentType>();
}
