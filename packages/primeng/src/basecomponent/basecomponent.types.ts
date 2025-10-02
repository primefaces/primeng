import type { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

export interface Lifecycle {
    /**
     * Simulates Angular's ngOnInit hook.
     * @see {@link OnInit#ngOnInit}
     */
    onInit(): void;
    /**
     * Simulates Angular's ngOnChanges hook.
     * @see {@link OnChanges#ngOnChanges}
     */
    onChanges(changes: SimpleChanges): void;
    /**
     * Simulates Angular's ngDoCheck hook.
     * @see {@link DoCheck#ngDoCheck}
     */
    onDoCheck(): void;
    /**
     * Simulates Angular's ngOnDestroy hook.
     * @see {@link OnDestroy#ngOnDestroy}
     */
    onDestroy(): void;
    /**
     * Simulates Angular's ngAfterContentInit hook.
     * @see {@link AfterContentInit#ngAfterContentInit}
     */
    onAfterContentInit(): void;
    /**
     * Simulates Angular's ngAfterContentChecked hook.
     * @see {@link AfterContentChecked#ngAfterContentChecked}
     */
    onAfterContentChecked(): void;
    /**
     * Simulates Angular's ngAfterViewInit hook.
     * @see {@link AfterViewInit#ngAfterViewInit}
     */
    onAfterViewInit(): void;
    /**
     * Simulates Angular's ngAfterViewChecked hook.
     * @see {@link AfterViewChecked#ngAfterViewChecked}
     */
    onAfterViewChecked(): void;
}

export type LifecycleHooks = 'onBeforeInit' | keyof Lifecycle;
