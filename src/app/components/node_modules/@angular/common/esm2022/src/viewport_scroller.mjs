/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { inject, PLATFORM_ID, ɵɵdefineInjectable } from '@angular/core';
import { DOCUMENT } from './dom_tokens';
import { isPlatformBrowser } from './platform_id';
/**
 * Defines a scroll position manager. Implemented by `BrowserViewportScroller`.
 *
 * @publicApi
 */
export class ViewportScroller {
    // De-sugared tree-shakable injection
    // See #23917
    /** @nocollapse */
    static { this.ɵprov = ɵɵdefineInjectable({
        token: ViewportScroller,
        providedIn: 'root',
        factory: () => isPlatformBrowser(inject(PLATFORM_ID))
            ? new BrowserViewportScroller(inject(DOCUMENT), window)
            : new NullViewportScroller(),
    }); }
}
/**
 * Manages the scroll position for a browser window.
 */
export class BrowserViewportScroller {
    constructor(document, window) {
        this.document = document;
        this.window = window;
        this.offset = () => [0, 0];
    }
    /**
     * Configures the top offset used when scrolling to an anchor.
     * @param offset A position in screen coordinates (a tuple with x and y values)
     * or a function that returns the top offset position.
     *
     */
    setOffset(offset) {
        if (Array.isArray(offset)) {
            this.offset = () => offset;
        }
        else {
            this.offset = offset;
        }
    }
    /**
     * Retrieves the current scroll position.
     * @returns The position in screen coordinates.
     */
    getScrollPosition() {
        return [this.window.scrollX, this.window.scrollY];
    }
    /**
     * Sets the scroll position.
     * @param position The new position in screen coordinates.
     */
    scrollToPosition(position) {
        this.window.scrollTo(position[0], position[1]);
    }
    /**
     * Scrolls to an element and attempts to focus the element.
     *
     * Note that the function name here is misleading in that the target string may be an ID for a
     * non-anchor element.
     *
     * @param target The ID of an element or name of the anchor.
     *
     * @see https://html.spec.whatwg.org/#the-indicated-part-of-the-document
     * @see https://html.spec.whatwg.org/#scroll-to-fragid
     */
    scrollToAnchor(target) {
        const elSelected = findAnchorFromDocument(this.document, target);
        if (elSelected) {
            this.scrollToElement(elSelected);
            // After scrolling to the element, the spec dictates that we follow the focus steps for the
            // target. Rather than following the robust steps, simply attempt focus.
            //
            // @see https://html.spec.whatwg.org/#get-the-focusable-area
            // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus
            // @see https://html.spec.whatwg.org/#focusable-area
            elSelected.focus();
        }
    }
    /**
     * Disables automatic scroll restoration provided by the browser.
     */
    setHistoryScrollRestoration(scrollRestoration) {
        this.window.history.scrollRestoration = scrollRestoration;
    }
    /**
     * Scrolls to an element using the native offset and the specified offset set on this scroller.
     *
     * The offset can be used when we know that there is a floating header and scrolling naively to an
     * element (ex: `scrollIntoView`) leaves the element hidden behind the floating header.
     */
    scrollToElement(el) {
        const rect = el.getBoundingClientRect();
        const left = rect.left + this.window.pageXOffset;
        const top = rect.top + this.window.pageYOffset;
        const offset = this.offset();
        this.window.scrollTo(left - offset[0], top - offset[1]);
    }
}
function findAnchorFromDocument(document, target) {
    const documentResult = document.getElementById(target) || document.getElementsByName(target)[0];
    if (documentResult) {
        return documentResult;
    }
    // `getElementById` and `getElementsByName` won't pierce through the shadow DOM so we
    // have to traverse the DOM manually and do the lookup through the shadow roots.
    if (typeof document.createTreeWalker === 'function' &&
        document.body &&
        typeof document.body.attachShadow === 'function') {
        const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
        let currentNode = treeWalker.currentNode;
        while (currentNode) {
            const shadowRoot = currentNode.shadowRoot;
            if (shadowRoot) {
                // Note that `ShadowRoot` doesn't support `getElementsByName`
                // so we have to fall back to `querySelector`.
                const result = shadowRoot.getElementById(target) || shadowRoot.querySelector(`[name="${target}"]`);
                if (result) {
                    return result;
                }
            }
            currentNode = treeWalker.nextNode();
        }
    }
    return null;
}
/**
 * Provides an empty implementation of the viewport scroller.
 */
export class NullViewportScroller {
    /**
     * Empty implementation
     */
    setOffset(offset) { }
    /**
     * Empty implementation
     */
    getScrollPosition() {
        return [0, 0];
    }
    /**
     * Empty implementation
     */
    scrollToPosition(position) { }
    /**
     * Empty implementation
     */
    scrollToAnchor(anchor) { }
    /**
     * Empty implementation
     */
    setHistoryScrollRestoration(scrollRestoration) { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3BvcnRfc2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL3ZpZXdwb3J0X3Njcm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQWdCLGdCQUFnQjtJQUNwQyxxQ0FBcUM7SUFDckMsYUFBYTtJQUNiLGtCQUFrQjthQUNYLFVBQUssR0FBNkIsa0JBQWtCLENBQUM7UUFDMUQsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixVQUFVLEVBQUUsTUFBTTtRQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osaUJBQWlCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDdkQsQ0FBQyxDQUFDLElBQUksb0JBQW9CLEVBQUU7S0FDakMsQ0FBQyxDQUFDOztBQW9DTDs7R0FFRztBQUNILE1BQU0sT0FBTyx1QkFBdUI7SUFHbEMsWUFDVSxRQUFrQixFQUNsQixNQUFjO1FBRGQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSmhCLFdBQU0sR0FBMkIsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFLbkQsQ0FBQztJQUVKOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLE1BQW1EO1FBQzNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxN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Z0JBQzlDLE1BQU0sTUFBTSxHQUNWLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLE1BQU0sSUFBSSxDQUFDLENBQUM7Z0JBQ3RGLElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1gsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDO1lBRUQsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQXdCLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7O09BRUc7SUFDSCxTQUFTLENBQUMsTUFBbUQsSUFBUyxDQUFDO0lBRXZFOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2YsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBQyxRQUEwQixJQUFTLENBQUM7SUFFckQ7O09BRUc7SUFDSCxjQUFjLENBQUMsTUFBYyxJQUFTLENBQUM7SUFFdkM7O09BRUc7SUFDSCwyQkFBMkIsQ0FBQyxpQkFBb0MsSUFBUyxDQUFDO0NBQzNFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7aW5qZWN0LCBQTEFURk9STV9JRCwgybXJtWRlZmluZUluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuL2RvbV90b2tlbnMnO1xuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnLi9wbGF0Zm9ybV9pZCc7XG5cbi8qKlxuICogRGVmaW5lcyBhIHNjcm9sbCBwb3NpdGlvbiBtYW5hZ2VyLiBJbXBsZW1lbnRlZCBieSBgQnJvd3NlclZpZXdwb3J0U2Nyb2xsZXJgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdwb3J0U2Nyb2xsZXIge1xuICAvLyBEZS1zdWdhcmVkIHRyZWUtc2hha2FibGUgaW5qZWN0aW9uXG4gIC8vIFNlZSAjMjM5MTdcbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyDJtXByb3YgPSAvKiogQHB1cmVPckJyZWFrTXlDb2RlICovIMm1ybVkZWZpbmVJbmplY3RhYmxlKHtcbiAgICB0b2tlbjogVmlld3BvcnRTY3JvbGxlcixcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogKCkgPT5cbiAgICAgIGlzUGxhdGZvcm1Ccm93c2VyKGluamVjdChQTEFURk9STV9JRCkpXG4gICAgICAgID8gbmV3IEJyb3dzZXJWaWV3cG9ydFNjcm9sbGVyKGluamVjdChET0NVTUVOVCksIHdpbmRvdylcbiAgICAgICAgOiBuZXcgTnVsbFZpZXdwb3J0U2Nyb2xsZXIoKSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIHRvcCBvZmZzZXQgdXNlZCB3aGVuIHNjcm9sbGluZyB0byBhbiBhbmNob3IuXG4gICAqIEBwYXJhbSBvZmZzZXQgQSBwb3NpdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMgKGEgdHVwbGUgd2l0aCB4IGFuZCB5IHZhbHVlcylcbiAgICogb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHRvcCBvZmZzZXQgcG9zaXRpb24uXG4gICAqXG4gICAqL1xuICBhYnN0cmFjdCBzZXRPZmZzZXQob2Zmc2V0OiBbbnVtYmVyLCBudW1iZXJdIHwgKCgpID0+IFtudW1iZXIsIG51bWJlcl0pKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbi5cbiAgICogQHJldHVybnMgQSBwb3NpdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMgKGEgdHVwbGUgd2l0aCB4IGFuZCB5IHZhbHVlcykuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTY3JvbGxQb3NpdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRvIGEgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gQSBwb3NpdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMgKGEgdHVwbGUgd2l0aCB4IGFuZCB5IHZhbHVlcykuXG4gICAqL1xuICBhYnN0cmFjdCBzY3JvbGxUb1Bvc2l0aW9uKHBvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZDtcblxuICAvKipcbiAgICogU2Nyb2xscyB0byBhbiBhbmNob3IgZWxlbWVudC5cbiAgICogQHBhcmFtIGFuY2hvciBUaGUgSUQgb2YgdGhlIGFuY2hvciBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3Qgc2Nyb2xsVG9BbmNob3IoYW5jaG9yOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyBhdXRvbWF0aWMgc2Nyb2xsIHJlc3RvcmF0aW9uIHByb3ZpZGVkIGJ5IHRoZSBicm93c2VyLlxuICAgKiBTZWUgYWxzbyBbd2luZG93Lmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb25cbiAgICogaW5mb10oaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNS8wOS9oaXN0b3J5LWFwaS1zY3JvbGwtcmVzdG9yYXRpb24pLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0SGlzdG9yeVNjcm9sbFJlc3RvcmF0aW9uKHNjcm9sbFJlc3RvcmF0aW9uOiAnYXV0bycgfCAnbWFudWFsJyk6IHZvaWQ7XG59XG5cbi8qKlxuICogTWFuYWdlcyB0aGUgc2Nyb2xsIHBvc2l0aW9uIGZvciBhIGJyb3dzZXIgd2luZG93LlxuICovXG5leHBvcnQgY2xhc3MgQnJvd3NlclZpZXdwb3J0U2Nyb2xsZXIgaW1wbGVtZW50cyBWaWV3cG9ydFNjcm9sbGVyIHtcbiAgcHJpdmF0ZSBvZmZzZXQ6ICgpID0+IFtudW1iZXIsIG51bWJlcl0gPSAoKSA9PiBbMCwgMF07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvdyxcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSB0b3Agb2Zmc2V0IHVzZWQgd2hlbiBzY3JvbGxpbmcgdG8gYW4gYW5jaG9yLlxuICAgKiBAcGFyYW0gb2Zmc2V0IEEgcG9zaXRpb24gaW4gc2NyZWVuIGNvb3JkaW5hdGVzIChhIHR1cGxlIHdpdGggeCBhbmQgeSB2YWx1ZXMpXG4gICAqIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB0b3Agb2Zmc2V0IHBvc2l0aW9uLlxuICAgKlxuICAgKi9cbiAgc2V0T2Zmc2V0KG9mZnNldDogW251bWJlciwgbnVtYmVyXSB8ICgoKSA9PiBbbnVtYmVyLCBudW1iZXJdKSk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9mZnNldCkpIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gKCkgPT4gb2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbi5cbiAgICogQHJldHVybnMgVGhlIHBvc2l0aW9uIGluIHNjcmVlbiBjb29yZGluYXRlcy5cbiAgICovXG4gIGdldFNjcm9sbFBvc2l0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIHJldHVybiBbdGhpcy53aW5kb3cuc2Nyb2xsWCwgdGhpcy53aW5kb3cuc2Nyb2xsWV07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIG5ldyBwb3NpdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMuXG4gICAqL1xuICBzY3JvbGxUb1Bvc2l0aW9uKHBvc2l0aW9uOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cuc2Nyb2xsVG8ocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRvIGFuIGVsZW1lbnQgYW5kIGF0dGVtcHRzIHRvIGZvY3VzIHRoZSBlbGVtZW50LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGZ1bmN0aW9uIG5hbWUgaGVyZSBpcyBtaXNsZWFkaW5nIGluIHRoYXQgdGhlIHRhcmdldCBzdHJpbmcgbWF5IGJlIGFuIElEIGZvciBhXG4gICAqIG5vbi1hbmNob3IgZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgSUQgb2YgYW4gZWxlbWVudCBvciBuYW1lIG9mIHRoZSBhbmNob3IuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jdGhlLWluZGljYXRlZC1wYXJ0LW9mLXRoZS1kb2N1bWVudFxuICAgKiBAc2VlIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3Njcm9sbC10by1mcmFnaWRcbiAgICovXG4gIHNjcm9sbFRvQW5jaG9yKHRhcmdldDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZWxTZWxlY3RlZCA9IGZpbmRBbmNob3JGcm9tRG9jdW1lbnQodGhpcy5kb2N1bWVudCwgdGFyZ2V0KTtcblxuICAgIGlmIChlbFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvRWxlbWVudChlbFNlbGVjdGVkKTtcbiAgICAgIC8vIEFmdGVyIHNjcm9sbGluZyB0byB0aGUgZWxlbWVudCwgdGhlIHNwZWMgZGljdGF0ZXMgdGhhdCB3ZSBmb2xsb3cgdGhlIGZvY3VzIHN0ZXBzIGZvciB0aGVcbiAgICAgIC8vIHRhcmdldC4gUmF0aGVyIHRoYW4gZm9sbG93aW5nIHRoZSByb2J1c3Qgc3RlcHMsIHNpbXBseSBhdHRlbXB0IGZvY3VzLlxuICAgICAgLy9cbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jZ2V0LXRoZS1mb2N1c2FibGUtYXJlYVxuICAgICAgLy8gQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTE9yRm9yZWlnbkVsZW1lbnQvZm9jdXNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jZm9jdXNhYmxlLWFyZWFcbiAgICAgIGVsU2VsZWN0ZWQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzYWJsZXMgYXV0b21hdGljIHNjcm9sbCByZXN0b3JhdGlvbiBwcm92aWRlZCBieSB0aGUgYnJvd3Nlci5cbiAgICovXG4gIHNldEhpc3RvcnlTY3JvbGxSZXN0b3JhdGlvbihzY3JvbGxSZXN0b3JhdGlvbjogJ2F1dG8nIHwgJ21hbnVhbCcpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gc2Nyb2xsUmVzdG9yYXRpb247XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xscyB0byBhbiBlbGVtZW50IHVzaW5nIHRoZSBuYXRpdmUgb2Zmc2V0IGFuZCB0aGUgc3BlY2lmaWVkIG9mZnNldCBzZXQgb24gdGhpcyBzY3JvbGxlci5cbiAgICpcbiAgICogVGhlIG9mZnNldCBjYW4gYmUgdXNlZCB3aGVuIHdlIGtub3cgdGhhdCB0aGVyZSBpcyBhIGZsb2F0aW5nIGhlYWRlciBhbmQgc2Nyb2xsaW5nIG5haXZlbHkgdG8gYW5cbiAgICogZWxlbWVudCAoZXg6IGBzY3JvbGxJbnRvVmlld2ApIGxlYXZlcyB0aGUgZWxlbWVudCBoaWRkZW4gYmVoaW5kIHRoZSBmbG9hdGluZyBoZWFkZXIuXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbFRvRWxlbWVudChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgbGVmdCA9IHJlY3QubGVmdCArIHRoaXMud2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgIGNvbnN0IHRvcCA9IHJlY3QudG9wICsgdGhpcy53aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcbiAgICB0aGlzLndpbmRvdy5zY3JvbGxUbyhsZWZ0IC0gb2Zmc2V0WzBdLCB0b3AgLSBvZmZzZXRbMV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRBbmNob3JGcm9tRG9jdW1lbnQoZG9jdW1lbnQ6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IGRvY3VtZW50UmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0YXJnZXQpWzBdO1xuXG4gIGlmIChkb2N1bWVudFJlc3VsdCkge1xuICAgIHJldHVybiBkb2N1bWVudFJlc3VsdDtcbiAgfVxuXG4gIC8vIGBnZXRFbGVtZW50QnlJZGAgYW5kIGBnZXRFbGVtZW50c0J5TmFtZWAgd29uJ3QgcGllcmNlIHRocm91Z2ggdGhlIHNoYWRvdyBET00gc28gd2VcbiAgLy8gaGF2ZSB0byB0cmF2ZXJzZSB0aGUgRE9NIG1hbnVhbGx5IGFuZCBkbyB0aGUgbG9va3VwIHRocm91Z2ggdGhlIHNoYWRvdyByb290cy5cbiAgaWYgKFxuICAgIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyID09PSAnZnVuY3Rpb24nICYmXG4gICAgZG9jdW1lbnQuYm9keSAmJlxuICAgIHR5cGVvZiBkb2N1bWVudC5ib2R5LmF0dGFjaFNoYWRvdyA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICBjb25zdCB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihkb2N1bWVudC5ib2R5LCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgbGV0IGN1cnJlbnROb2RlID0gdHJlZVdhbGtlci5jdXJyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICB3aGlsZSAoY3VycmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSBjdXJyZW50Tm9kZS5zaGFkb3dSb290O1xuXG4gICAgICBpZiAoc2hhZG93Um9vdCkge1xuICAgICAgICAvLyBOb3RlIHRoYXQgYFNoYWRvd1Jvb3RgIGRvZXNuJ3Qgc3VwcG9ydCBgZ2V0RWxlbWVudHNCeU5hbWVgXG4gICAgICAgIC8vIHNvIHdlIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGBxdWVyeVNlbGVjdG9yYC5cbiAgICAgICAgY29uc3QgcmVzdWx0ID1cbiAgICAgICAgICBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKHRhcmdldCkgfHwgc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7dGFyZ2V0fVwiXWApO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjdXJyZW50Tm9kZSA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYW4gZW1wdHkgaW1wbGVtZW50YXRpb24gb2YgdGhlIHZpZXdwb3J0IHNjcm9sbGVyLlxuICovXG5leHBvcnQgY2xhc3MgTnVsbFZpZXdwb3J0U2Nyb2xsZXIgaW1wbGVtZW50cyBWaWV3cG9ydFNjcm9sbGVyIHtcbiAgLyoqXG4gICAqIEVtcHR5IGltcGxlbWVudGF0aW9uXG4gICAqL1xuICBzZXRPZmZzZXQob2Zmc2V0OiBbbnVtYmVyLCBudW1iZXJdIHwgKCgpID0+IFtudW1iZXIsIG51bWJlcl0pKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBFbXB0eSBpbXBsZW1lbnRhdGlvblxuICAgKi9cbiAgZ2V0U2Nyb2xsUG9zaXRpb24oKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFswLCAwXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbXB0eSBpbXBsZW1lbnRhdGlvblxuICAgKi9cbiAgc2Nyb2xsVG9Qb3NpdGlvbihwb3NpdGlvbjogW251bWJlciwgbnVtYmVyXSk6IHZvaWQge31cblxuICAvKipcbiAgICogRW1wdHkgaW1wbGVtZW50YXRpb25cbiAgICovXG4gIHNjcm9sbFRvQW5jaG9yKGFuY2hvcjogc3RyaW5nKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBFbXB0eSBpbXBsZW1lbnRhdGlvblxuICAgKi9cbiAgc2V0SGlzdG9yeVNjcm9sbFJlc3RvcmF0aW9uKHNjcm9sbFJlc3RvcmF0aW9uOiAnYXV0bycgfCAnbWFudWFsJyk6IHZvaWQge31cbn1cbiJdfQ==