interface ZIndexOptions {
    get(element?: HTMLElement): number;
    set(key: string, element: HTMLElement, baseZIndex?: number): void;
    clear(element: HTMLElement): void;
    getCurrent(key: string): number;
}
declare const ZIndex: ZIndexOptions;

export { ZIndex, type ZIndexOptions };
