/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../util/property';
import { stringify } from '../util/stringify';
const __forward_ref__ = getClosureSafeProperty({ __forward_ref__: getClosureSafeProperty });
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared, but not yet defined. It is also used when the `token` which we use when creating
 * a query is not yet defined.
 *
 * `forwardRef` is also used to break circularities in standalone components imports.
 *
 * @usageNotes
 * ### Circular dependency example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 *
 * ### Circular standalone reference import example
 * ```ts
 * @Component({
 *   standalone: true,
 *   imports: [ChildComponent],
 *   selector: 'app-parent',
 *   template: `<app-child [hideParent]="hideParent"></app-child>`,
 * })
 * export class ParentComponent {
 *   @Input() hideParent: boolean;
 * }
 *
 *
 * @Component({
 *   standalone: true,
 *   imports: [CommonModule, forwardRef(() => ParentComponent)],
 *   selector: 'app-child',
 *   template: `<app-parent *ngIf="!hideParent"></app-parent>`,
 * })
 * export class ChildComponent {
 *   @Input() hideParent: boolean;
 * }
 * ```
 *
 * @publicApi
 */
export function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () {
        return stringify(this());
    };
    return forwardRefFn;
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * @see {@link forwardRef}
 * @publicApi
 */
export function resolveForwardRef(type) {
    return isForwardRef(type) ? type() : type;
}
/** Checks whether a function is wrapped by a `forwardRef`. */
export function isForwardRef(fn) {
    return typeof fn === 'function' && fn.hasOwnProperty(__forward_ref__) &&
        fn.__forward_ref__ === forwardRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yd2FyZF9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9mb3J3YXJkX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFpQjVDLE1BQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUUxRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLFlBQTBCO0lBQzdDLFlBQWEsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBQzNDLFlBQWEsQ0FBQyxRQUFRLEdBQUc7UUFDN0IsT0FBTyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFDRixPQUF3QixZQUFhLENBQUM7QUFDeEMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxJQUFPO0lBQzFDLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzVDLENBQUM7QUFFRCw4REFBOEQ7QUFDOUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxFQUFPO0lBQ2xDLE9BQU8sT0FBTyxFQUFFLEtBQUssVUFBVSxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDO0FBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uL3V0aWwvcHJvcGVydHknO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5JztcblxuXG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgYSBmdW5jdGlvbiBwYXNzZWQgaW50byBgZm9yd2FyZFJlZmAgaGFzIHRvIGltcGxlbWVudC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9mb3J3YXJkX3JlZi9mb3J3YXJkX3JlZl9zcGVjLnRzIHJlZ2lvbj0nZm9yd2FyZF9yZWZfZm4nfVxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZvcndhcmRSZWZGbiB7XG4gICgpOiBhbnk7XG59XG5cbmNvbnN0IF9fZm9yd2FyZF9yZWZfXyA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe19fZm9yd2FyZF9yZWZfXzogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG4vKipcbiAqIEFsbG93cyB0byByZWZlciB0byByZWZlcmVuY2VzIHdoaWNoIGFyZSBub3QgeWV0IGRlZmluZWQuXG4gKlxuICogRm9yIGluc3RhbmNlLCBgZm9yd2FyZFJlZmAgaXMgdXNlZCB3aGVuIHRoZSBgdG9rZW5gIHdoaWNoIHdlIG5lZWQgdG8gcmVmZXIgdG8gZm9yIHRoZSBwdXJwb3NlcyBvZlxuICogREkgaXMgZGVjbGFyZWQsIGJ1dCBub3QgeWV0IGRlZmluZWQuIEl0IGlzIGFsc28gdXNlZCB3aGVuIHRoZSBgdG9rZW5gIHdoaWNoIHdlIHVzZSB3aGVuIGNyZWF0aW5nXG4gKiBhIHF1ZXJ5IGlzIG5vdCB5ZXQgZGVmaW5lZC5cbiAqXG4gKiBgZm9yd2FyZFJlZmAgaXMgYWxzbyB1c2VkIHRvIGJyZWFrIGNpcmN1bGFyaXRpZXMgaW4gc3RhbmRhbG9uZSBjb21wb25lbnRzIGltcG9ydHMuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBDaXJjdWxhciBkZXBlbmRlbmN5IGV4YW1wbGVcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2ZvcndhcmRfcmVmL2ZvcndhcmRfcmVmX3NwZWMudHMgcmVnaW9uPSdmb3J3YXJkX3JlZid9XG4gKlxuICogIyMjIENpcmN1bGFyIHN0YW5kYWxvbmUgcmVmZXJlbmNlIGltcG9ydCBleGFtcGxlXG4gKiBgYGB0c1xuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIGltcG9ydHM6IFtDaGlsZENvbXBvbmVudF0sXG4gKiAgIHNlbGVjdG9yOiAnYXBwLXBhcmVudCcsXG4gKiAgIHRlbXBsYXRlOiBgPGFwcC1jaGlsZCBbaGlkZVBhcmVudF09XCJoaWRlUGFyZW50XCI+PC9hcHAtY2hpbGQ+YCxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFyZW50Q29tcG9uZW50IHtcbiAqICAgQElucHV0KCkgaGlkZVBhcmVudDogYm9vbGVhbjtcbiAqIH1cbiAqXG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIGZvcndhcmRSZWYoKCkgPT4gUGFyZW50Q29tcG9uZW50KV0sXG4gKiAgIHNlbGVjdG9yOiAnYXBwLWNoaWxkJyxcbiAqICAgdGVtcGxhdGU6IGA8YXBwLXBhcmVudCAqbmdJZj1cIiFoaWRlUGFyZW50XCI+PC9hcHAtcGFyZW50PmAsXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIENoaWxkQ29tcG9uZW50IHtcbiAqICAgQElucHV0KCkgaGlkZVBhcmVudDogYm9vbGVhbjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmRSZWYoZm9yd2FyZFJlZkZuOiBGb3J3YXJkUmVmRm4pOiBUeXBlPGFueT4ge1xuICAoPGFueT5mb3J3YXJkUmVmRm4pLl9fZm9yd2FyZF9yZWZfXyA9IGZvcndhcmRSZWY7XG4gICg8YW55PmZvcndhcmRSZWZGbikudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RyaW5naWZ5KHRoaXMoKSk7XG4gIH07XG4gIHJldHVybiAoPFR5cGU8YW55Pj48YW55PmZvcndhcmRSZWZGbik7XG59XG5cbi8qKlxuICogTGF6aWx5IHJldHJpZXZlcyB0aGUgcmVmZXJlbmNlIHZhbHVlIGZyb20gYSBmb3J3YXJkUmVmLlxuICpcbiAqIEFjdHMgYXMgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIHdoZW4gZ2l2ZW4gYSBub24tZm9yd2FyZC1yZWYgdmFsdWUuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvZm9yd2FyZF9yZWYvZm9yd2FyZF9yZWZfc3BlYy50cyByZWdpb249J3Jlc29sdmVfZm9yd2FyZF9yZWYnfVxuICpcbiAqIEBzZWUge0BsaW5rIGZvcndhcmRSZWZ9XG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRm9yd2FyZFJlZjxUPih0eXBlOiBUKTogVCB7XG4gIHJldHVybiBpc0ZvcndhcmRSZWYodHlwZSkgPyB0eXBlKCkgOiB0eXBlO1xufVxuXG4vKiogQ2hlY2tzIHdoZXRoZXIgYSBmdW5jdGlvbiBpcyB3cmFwcGVkIGJ5IGEgYGZvcndhcmRSZWZgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRm9yd2FyZFJlZihmbjogYW55KTogZm4gaXMoKSA9PiBhbnkge1xuICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGZuLmhhc093blByb3BlcnR5KF9fZm9yd2FyZF9yZWZfXykgJiZcbiAgICAgIGZuLl9fZm9yd2FyZF9yZWZfXyA9PT0gZm9yd2FyZFJlZjtcbn1cbiJdfQ==