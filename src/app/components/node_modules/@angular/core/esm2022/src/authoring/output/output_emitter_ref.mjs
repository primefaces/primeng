/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { setActiveConsumer } from '@angular/core/primitives/signals';
import { inject } from '../../di/injector_compatibility';
import { ErrorHandler } from '../../error_handler';
import { RuntimeError } from '../../errors';
import { DestroyRef } from '../../linker/destroy_ref';
/**
 * An `OutputEmitterRef` is created by the `output()` function and can be
 * used to emit values to consumers of your directive or component.
 *
 * Consumers of your directive/component can bind to the output and
 * subscribe to changes via the bound event syntax. For example:
 *
 * ```html
 * <my-comp (valueChange)="processNewValue($event)" />
 * ```
 *
 * @developerPreview
 */
export class OutputEmitterRef {
    constructor() {
        this.destroyed = false;
        this.listeners = null;
        this.errorHandler = inject(ErrorHandler, { optional: true });
        /** @internal */
        this.destroyRef = inject(DestroyRef);
        // Clean-up all listeners and mark as destroyed upon destroy.
        this.destroyRef.onDestroy(() => {
            this.destroyed = true;
            this.listeners = null;
        });
    }
    subscribe(callback) {
        if (this.destroyed) {
            throw new RuntimeError(953 /* RuntimeErrorCode.OUTPUT_REF_DESTROYED */, ngDevMode &&
                'Unexpected subscription to destroyed `OutputRef`. ' +
                    'The owning directive/component is destroyed.');
        }
        (this.listeners ??= []).push(callback);
        return {
            unsubscribe: () => {
                const idx = this.listeners?.indexOf(callback);
                if (idx !== undefined && idx !== -1) {
                    this.listeners?.splice(idx, 1);
                }
            }
        };
    }
    /** Emits a new value to the output. */
    emit(value) {
        if (this.destroyed) {
            throw new RuntimeError(953 /* RuntimeErrorCode.OUTPUT_REF_DESTROYED */, ngDevMode &&
                'Unexpected emit for destroyed `OutputRef`. ' +
                    'The owning directive/component is destroyed.');
        }
        if (this.listeners === null) {
            return;
        }
        const previousConsumer = setActiveConsumer(null);
        try {
            for (const listenerFn of this.listeners) {
                try {
                    listenerFn(value);
                }
                catch (err) {
                    this.errorHandler?.handleError(err);
                }
            }
        }
        finally {
            setActiveConsumer(previousConsumer);
        }
    }
}
/** Gets the owning `DestroyRef` for the given output. */
export function getOutputDestroyRef(ref) {
    return ref.destroyRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X2VtaXR0ZXJfcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvYXV0aG9yaW5nL291dHB1dC9vdXRwdXRfZW1pdHRlcl9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFbkUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFtQixNQUFNLGNBQWMsQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFJcEQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQVEzQjtRQVBRLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFtQyxJQUFJLENBQUM7UUFDakQsaUJBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFFOUQsZ0JBQWdCO1FBQ2hCLGVBQVUsR0FBZSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHMUMsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBNEI7UUFDcEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLFlBQVksa0RBRWxCLFNBQVM7Z0JBQ0wsb0RBQW9EO29CQUNoRCw4Q0FBOEMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZDLE9BQU87WUFDTCxXQUFXLEVBQUUsR0FBRyxFQUFFO2dCQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7WUFDSCxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsSUFBSSxDQUFDLEtBQVE7UUFDWCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksWUFBWSxrREFFbEIsU0FBUztnQkFDTCw2Q0FBNkM7b0JBQ3pDLDhDQUE4QyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM1QixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDO1lBQ0gsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQztvQkFDSCxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLENBQUM7Z0JBQUMsT0FBTyxHQUFZLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBRUQseURBQXlEO0FBQ3pELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxHQUF1QjtJQUN6RCxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3NldEFjdGl2ZUNvbnN1bWVyfSBmcm9tICdAYW5ndWxhci9jb3JlL3ByaW1pdGl2ZXMvc2lnbmFscyc7XG5cbmltcG9ydCB7aW5qZWN0fSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7RXJyb3JIYW5kbGVyfSBmcm9tICcuLi8uLi9lcnJvcl9oYW5kbGVyJztcbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi8uLi9lcnJvcnMnO1xuaW1wb3J0IHtEZXN0cm95UmVmfSBmcm9tICcuLi8uLi9saW5rZXIvZGVzdHJveV9yZWYnO1xuXG5pbXBvcnQge091dHB1dFJlZiwgT3V0cHV0UmVmU3Vic2NyaXB0aW9ufSBmcm9tICcuL291dHB1dF9yZWYnO1xuXG4vKipcbiAqIEFuIGBPdXRwdXRFbWl0dGVyUmVmYCBpcyBjcmVhdGVkIGJ5IHRoZSBgb3V0cHV0KClgIGZ1bmN0aW9uIGFuZCBjYW4gYmVcbiAqIHVzZWQgdG8gZW1pdCB2YWx1ZXMgdG8gY29uc3VtZXJzIG9mIHlvdXIgZGlyZWN0aXZlIG9yIGNvbXBvbmVudC5cbiAqXG4gKiBDb25zdW1lcnMgb2YgeW91ciBkaXJlY3RpdmUvY29tcG9uZW50IGNhbiBiaW5kIHRvIHRoZSBvdXRwdXQgYW5kXG4gKiBzdWJzY3JpYmUgdG8gY2hhbmdlcyB2aWEgdGhlIGJvdW5kIGV2ZW50IHN5bnRheC4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgaHRtbFxuICogPG15LWNvbXAgKHZhbHVlQ2hhbmdlKT1cInByb2Nlc3NOZXdWYWx1ZSgkZXZlbnQpXCIgLz5cbiAqIGBgYFxuICpcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRwdXRFbWl0dGVyUmVmPFQ+IGltcGxlbWVudHMgT3V0cHV0UmVmPFQ+IHtcbiAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IEFycmF5PCh2YWx1ZTogVCkgPT4gdm9pZD58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZXJyb3JIYW5kbGVyID0gaW5qZWN0KEVycm9ySGFuZGxlciwge29wdGlvbmFsOiB0cnVlfSk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBkZXN0cm95UmVmOiBEZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIENsZWFuLXVwIGFsbCBsaXN0ZW5lcnMgYW5kIG1hcmsgYXMgZGVzdHJveWVkIHVwb24gZGVzdHJveS5cbiAgICB0aGlzLmRlc3Ryb3lSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnNjcmliZShjYWxsYmFjazogKHZhbHVlOiBUKSA9PiB2b2lkKTogT3V0cHV0UmVmU3Vic2NyaXB0aW9uIHtcbiAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5PVVRQVVRfUkVGX0RFU1RST1lFRCxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgJ1VuZXhwZWN0ZWQgc3Vic2NyaXB0aW9uIHRvIGRlc3Ryb3llZCBgT3V0cHV0UmVmYC4gJyArXG4gICAgICAgICAgICAgICAgICAnVGhlIG93bmluZyBkaXJlY3RpdmUvY29tcG9uZW50IGlzIGRlc3Ryb3llZC4nKTtcbiAgICB9XG5cbiAgICAodGhpcy5saXN0ZW5lcnMgPz89IFtdKS5wdXNoKGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB7XG4gICAgICB1bnN1YnNjcmliZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmxpc3RlbmVycz8uaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgIGlmIChpZHggIT09IHVuZGVmaW5lZCAmJiBpZHggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnM/LnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBhIG5ldyB2YWx1ZSB0byB0aGUgb3V0cHV0LiAqL1xuICBlbWl0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuT1VUUFVUX1JFRl9ERVNUUk9ZRUQsXG4gICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgICdVbmV4cGVjdGVkIGVtaXQgZm9yIGRlc3Ryb3llZCBgT3V0cHV0UmVmYC4gJyArXG4gICAgICAgICAgICAgICAgICAnVGhlIG93bmluZyBkaXJlY3RpdmUvY29tcG9uZW50IGlzIGRlc3Ryb3llZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saXN0ZW5lcnMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c0NvbnN1bWVyID0gc2V0QWN0aXZlQ29uc3VtZXIobnVsbCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxpc3RlbmVyRm4odmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcj8uaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRBY3RpdmVDb25zdW1lcihwcmV2aW91c0NvbnN1bWVyKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIEdldHMgdGhlIG93bmluZyBgRGVzdHJveVJlZmAgZm9yIHRoZSBnaXZlbiBvdXRwdXQuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3V0cHV0RGVzdHJveVJlZihyZWY6IE91dHB1dFJlZjx1bmtub3duPik6IERlc3Ryb3lSZWZ8dW5kZWZpbmVkIHtcbiAgcmV0dXJuIHJlZi5kZXN0cm95UmVmO1xufVxuIl19