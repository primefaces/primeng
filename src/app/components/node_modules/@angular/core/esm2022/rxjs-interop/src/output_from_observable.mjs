/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertInInjectionContext, DestroyRef, inject, ɵRuntimeError } from '@angular/core';
import { takeUntilDestroyed } from './take_until_destroyed';
/**
 * Implementation of `OutputRef` that emits values from
 * an RxJS observable source.
 *
 * @internal
 */
class OutputFromObservableRef {
    constructor(source) {
        this.source = source;
        this.destroyed = false;
        this.destroyRef = inject(DestroyRef);
        this.destroyRef.onDestroy(() => {
            this.destroyed = true;
        });
    }
    subscribe(callbackFn) {
        if (this.destroyed) {
            throw new ɵRuntimeError(953 /* ɵRuntimeErrorCode.OUTPUT_REF_DESTROYED */, ngDevMode &&
                'Unexpected subscription to destroyed `OutputRef`. ' +
                    'The owning directive/component is destroyed.');
        }
        // Stop yielding more values when the directive/component is already destroyed.
        const subscription = this.source.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: value => callbackFn(value),
        });
        return {
            unsubscribe: () => subscription.unsubscribe(),
        };
    }
}
/**
 * Declares an Angular output that is using an RxJS observable as a source
 * for events dispatched to parent subscribers.
 *
 * The behavior for an observable as source is defined as followed:
 *    1. New values are forwarded to the Angular output (next notifications).
 *    2. Errors notifications are not handled by Angular. You need to handle these manually.
 *       For example by using `catchError`.
 *    3. Completion notifications stop the output from emitting new values.
 *
 * @usageNotes
 * Initialize an output in your directive by declaring a
 * class field and initializing it with the `outputFromObservable()` function.
 *
 * ```ts
 * @Directive({..})
 * export class MyDir {
 *   nameChange$ = <some-observable>;
 *   nameChange = outputFromObservable(this.nameChange$);
 * }
 * ```
 *
 * @developerPreview
 */
export function outputFromObservable(observable, opts) {
    ngDevMode && assertInInjectionContext(outputFromObservable);
    return new OutputFromObservableRef(observable);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X2Zyb21fb2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcnhqcy1pbnRlcm9wL3NyYy9vdXRwdXRfZnJvbV9vYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFtRCxhQUFhLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRzlKLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTFEOzs7OztHQUtHO0FBQ0gsTUFBTSx1QkFBdUI7SUFLM0IsWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUpqQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTFCLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxVQUE4QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksYUFBYSxtREFFbkIsU0FBUztnQkFDTCxvREFBb0Q7b0JBQ2hELDhDQUE4QyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELCtFQUErRTtRQUMvRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDbkYsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0wsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7U0FDOUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FDaEMsVUFBeUIsRUFBRSxJQUFvQjtJQUNqRCxTQUFTLElBQUksd0JBQXdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1RCxPQUFPLElBQUksdUJBQXVCLENBQUksVUFBVSxDQUFDLENBQUM7QUFDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydEluSW5qZWN0aW9uQ29udGV4dCwgRGVzdHJveVJlZiwgaW5qZWN0LCBPdXRwdXRPcHRpb25zLCBPdXRwdXRSZWYsIE91dHB1dFJlZlN1YnNjcmlwdGlvbiwgybVSdW50aW1lRXJyb3IsIMm1UnVudGltZUVycm9yQ29kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnLi90YWtlX3VudGlsX2Rlc3Ryb3llZCc7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgYE91dHB1dFJlZmAgdGhhdCBlbWl0cyB2YWx1ZXMgZnJvbVxuICogYW4gUnhKUyBvYnNlcnZhYmxlIHNvdXJjZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuY2xhc3MgT3V0cHV0RnJvbU9ic2VydmFibGVSZWY8VD4gaW1wbGVtZW50cyBPdXRwdXRSZWY8VD4ge1xuICBwcml2YXRlIGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgICB0aGlzLmRlc3Ryb3lSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnNjcmliZShjYWxsYmFja0ZuOiAodmFsdWU6IFQpID0+IHZvaWQpOiBPdXRwdXRSZWZTdWJzY3JpcHRpb24ge1xuICAgIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IMm1UnVudGltZUVycm9yKFxuICAgICAgICAgIMm1UnVudGltZUVycm9yQ29kZS5PVVRQVVRfUkVGX0RFU1RST1lFRCxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgJ1VuZXhwZWN0ZWQgc3Vic2NyaXB0aW9uIHRvIGRlc3Ryb3llZCBgT3V0cHV0UmVmYC4gJyArXG4gICAgICAgICAgICAgICAgICAnVGhlIG93bmluZyBkaXJlY3RpdmUvY29tcG9uZW50IGlzIGRlc3Ryb3llZC4nKTtcbiAgICB9XG5cbiAgICAvLyBTdG9wIHlpZWxkaW5nIG1vcmUgdmFsdWVzIHdoZW4gdGhlIGRpcmVjdGl2ZS9jb21wb25lbnQgaXMgYWxyZWFkeSBkZXN0cm95ZWQuXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5zb3VyY2UucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IHZhbHVlID0+IGNhbGxiYWNrRm4odmFsdWUpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVuc3Vic2NyaWJlOiAoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSxcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogRGVjbGFyZXMgYW4gQW5ndWxhciBvdXRwdXQgdGhhdCBpcyB1c2luZyBhbiBSeEpTIG9ic2VydmFibGUgYXMgYSBzb3VyY2VcbiAqIGZvciBldmVudHMgZGlzcGF0Y2hlZCB0byBwYXJlbnQgc3Vic2NyaWJlcnMuXG4gKlxuICogVGhlIGJlaGF2aW9yIGZvciBhbiBvYnNlcnZhYmxlIGFzIHNvdXJjZSBpcyBkZWZpbmVkIGFzIGZvbGxvd2VkOlxuICogICAgMS4gTmV3IHZhbHVlcyBhcmUgZm9yd2FyZGVkIHRvIHRoZSBBbmd1bGFyIG91dHB1dCAobmV4dCBub3RpZmljYXRpb25zKS5cbiAqICAgIDIuIEVycm9ycyBub3RpZmljYXRpb25zIGFyZSBub3QgaGFuZGxlZCBieSBBbmd1bGFyLiBZb3UgbmVlZCB0byBoYW5kbGUgdGhlc2UgbWFudWFsbHkuXG4gKiAgICAgICBGb3IgZXhhbXBsZSBieSB1c2luZyBgY2F0Y2hFcnJvcmAuXG4gKiAgICAzLiBDb21wbGV0aW9uIG5vdGlmaWNhdGlvbnMgc3RvcCB0aGUgb3V0cHV0IGZyb20gZW1pdHRpbmcgbmV3IHZhbHVlcy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogSW5pdGlhbGl6ZSBhbiBvdXRwdXQgaW4geW91ciBkaXJlY3RpdmUgYnkgZGVjbGFyaW5nIGFcbiAqIGNsYXNzIGZpZWxkIGFuZCBpbml0aWFsaXppbmcgaXQgd2l0aCB0aGUgYG91dHB1dEZyb21PYnNlcnZhYmxlKClgIGZ1bmN0aW9uLlxuICpcbiAqIGBgYHRzXG4gKiBARGlyZWN0aXZlKHsuLn0pXG4gKiBleHBvcnQgY2xhc3MgTXlEaXIge1xuICogICBuYW1lQ2hhbmdlJCA9IDxzb21lLW9ic2VydmFibGU+O1xuICogICBuYW1lQ2hhbmdlID0gb3V0cHV0RnJvbU9ic2VydmFibGUodGhpcy5uYW1lQ2hhbmdlJCk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gb3V0cHV0RnJvbU9ic2VydmFibGU8VD4oXG4gICAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxUPiwgb3B0cz86IE91dHB1dE9wdGlvbnMpOiBPdXRwdXRSZWY8VD4ge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0SW5JbmplY3Rpb25Db250ZXh0KG91dHB1dEZyb21PYnNlcnZhYmxlKTtcbiAgcmV0dXJuIG5ldyBPdXRwdXRGcm9tT2JzZXJ2YWJsZVJlZjxUPihvYnNlcnZhYmxlKTtcbn1cbiJdfQ==