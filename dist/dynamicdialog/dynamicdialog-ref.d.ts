import { Observable } from 'rxjs';
export declare class DynamicDialogRef {
    constructor();
    close(result?: any): void;
    destroy(): void;
    private readonly _onClose;
    onClose: Observable<any>;
    private readonly _onDestroy;
    onDestroy: Observable<any>;
}
