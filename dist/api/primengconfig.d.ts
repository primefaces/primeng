import { Translation } from './translation';
export declare class PrimeNGConfig {
    ripple: boolean;
    filterMatchModeOptions: {
        text: string[];
        numeric: string[];
        date: string[];
    };
    private translation;
    private translationSource;
    translationObserver: import("rxjs").Observable<any>;
    getTranslation(key: string): any;
    setTranslation(value: Translation): void;
}
