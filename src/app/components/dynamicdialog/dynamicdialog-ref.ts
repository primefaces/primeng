import { Observable, Subject } from 'rxjs';

export class DynamicDialogRef {
	constructor() { }

	close(result?: any) {
		this._onClose.next(result);
	}

	private readonly _onClose = new Subject<any>();
	onClose: Observable<any> = this._onClose.asObservable();
}
