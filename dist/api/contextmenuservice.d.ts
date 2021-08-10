export declare class ContextMenuService {
    private activeItemKeyChange;
    activeItemKeyChange$: import("rxjs").Observable<string>;
    activeItemKey: string;
    changeKey(key: any): void;
    reset(): void;
}
