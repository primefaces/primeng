import type { LifecycleHooks } from './lifecycle';

/**
 * Defines the pass-through options.
 */
export interface PassThroughOptions {
    /**
     * Defines whether the props should be merged.
     * @default false
     */
    mergeProps?: boolean | ((global: unknown, self: unknown, datasets?: unknown) => unknown);
    /**
     * Defines whether the sections should be merged.
     * @default true
     */
    mergeSections?: boolean | undefined;
}

/**
 * Defines the pass-through method options.
 * @template I Type of instance.
 * @template PI Type of parent instance.
 */
export interface PassThroughMethodOptions<I, PI = any> {
    /**
     * Defines instance.
     */
    instance: I;
    /**
     * Defines parent options.
     */
    parent: {
        instance: PI;
    };
    /**
     * Defines passthrough(pt) options in global config.
     */
    global?: Record<PropertyKey, unknown> | undefined;
}

export interface CommonPassThrough {
    /**
     * Used to manage all lifecycle hooks.
     */
    hooks?: LifecycleHooks;
}

type HTMLElementProps<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

type OnGlobalEventHandlers = {
    [K in keyof GlobalEventHandlers as K extends `on${infer Rest}` ? `on${Rest}` : never]: GlobalEventHandlers[K];
};

type PassThroughAttributes<E> = HTMLElementProps<E> &
    OnGlobalEventHandlers & {
        [key: string]: any;
    };

export declare type PassThroughOption<E = HTMLElement, I = any, PI = any> = PassThroughAttributes<E> | ((options: PassThroughMethodOptions<I, PI>) => PassThroughAttributes<E> | string) | string | null | undefined;

type AllPassThrough<O> = O & CommonPassThrough;

export declare type PassThrough<I, O> = AllPassThrough<O> | ((options: PassThroughMethodOptions<I>) => AllPassThrough<O>) | null | undefined;
