import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';
export declare class DynamicDialogInjector implements Injector {
    private _parentInjector;
    private _additionalTokens;
    constructor(_parentInjector: Injector, _additionalTokens: WeakMap<any, any>);
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    get(token: any, notFoundValue?: any): any;
}
