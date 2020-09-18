import { Observable, Subject } from 'rxjs';

export class DynamicDialogRef {
	constructor() { }

	private readonly _onClose = new Subject<any>();
    onClose: Observable<any> = this._onClose.asObservable();

    private readonly _onDestroy = new Subject<any>();
	onDestroy: Observable<any> = this._onDestroy.asObservable();

	close(result?: any) {
		this._onClose.next(result);
    }

    destroy() {
		this._onDestroy.next();
	}
}
