/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */
export class By {
    /**
     * Match all nodes.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     */
    static all() {
        return () => true;
    }
    /**
     * Match elements by the given CSS selector.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     */
    static css(selector) {
        return (debugElement) => {
            return debugElement.nativeElement != null ?
                elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    }
    /**
     * Match nodes that have the given directive present.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     */
    static directive(type) {
        return (debugNode) => debugNode.providerTokens.indexOf(type) !== -1;
    }
}
function elementMatches(n, selector) {
    if (getDOM().isElementNode(n)) {
        return n.matches && n.matches(selector) ||
            n.msMatchesSelector && n.msMatchesSelector(selector) ||
            n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUtsRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLEVBQUU7SUFDYjs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEdBQUc7UUFDUixPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBZ0I7UUFDekIsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3RCLE9BQU8sWUFBWSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDdkMsY0FBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsS0FBSyxDQUFDO1FBQ1osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQWU7UUFDOUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNGO0FBRUQsU0FBUyxjQUFjLENBQUMsQ0FBTSxFQUFFLFFBQWdCO0lBQzlDLElBQUksTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGVidWdFbGVtZW50LCBEZWJ1Z05vZGUsIFByZWRpY2F0ZSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuXG4vKipcbiAqIFByZWRpY2F0ZXMgZm9yIHVzZSB3aXRoIHtAbGluayBEZWJ1Z0VsZW1lbnR9J3MgcXVlcnkgZnVuY3Rpb25zLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEJ5IHtcbiAgLyoqXG4gICAqIE1hdGNoIGFsbCBub2Rlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHBsYXRmb3JtLWJyb3dzZXIvZG9tL2RlYnVnL3RzL2J5L2J5LnRzIHJlZ2lvbj0nYnlfYWxsJ31cbiAgICovXG4gIHN0YXRpYyBhbGwoKTogUHJlZGljYXRlPERlYnVnTm9kZT4ge1xuICAgIHJldHVybiAoKSA9PiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hdGNoIGVsZW1lbnRzIGJ5IHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3IuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS1icm93c2VyL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2Nzcyd9XG4gICAqL1xuICBzdGF0aWMgY3NzKHNlbGVjdG9yOiBzdHJpbmcpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiB7XG4gICAgcmV0dXJuIChkZWJ1Z0VsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBkZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudCAhPSBudWxsID9cbiAgICAgICAgICBlbGVtZW50TWF0Y2hlcyhkZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudCwgc2VsZWN0b3IpIDpcbiAgICAgICAgICBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hdGNoIG5vZGVzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gZGlyZWN0aXZlIHByZXNlbnQuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS1icm93c2VyL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2RpcmVjdGl2ZSd9XG4gICAqL1xuICBzdGF0aWMgZGlyZWN0aXZlKHR5cGU6IFR5cGU8YW55Pik6IFByZWRpY2F0ZTxEZWJ1Z05vZGU+IHtcbiAgICByZXR1cm4gKGRlYnVnTm9kZSkgPT4gZGVidWdOb2RlLnByb3ZpZGVyVG9rZW5zIS5pbmRleE9mKHR5cGUpICE9PSAtMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbGVtZW50TWF0Y2hlcyhuOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKGdldERPTSgpLmlzRWxlbWVudE5vZGUobikpIHtcbiAgICByZXR1cm4gbi5tYXRjaGVzICYmIG4ubWF0Y2hlcyhzZWxlY3RvcikgfHxcbiAgICAgICAgbi5tc01hdGNoZXNTZWxlY3RvciAmJiBuLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSB8fFxuICAgICAgICBuLndlYmtpdE1hdGNoZXNTZWxlY3RvciAmJiBuLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=