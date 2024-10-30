/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { IMAGE_CONFIG } from './application/application_tokens';
import { Injectable } from './di';
import { inject } from './di/injector_compatibility';
import { formatRuntimeError } from './errors';
import { getDocument } from './render3/interfaces/document';
import { NgZone } from './zone';
import * as i0 from "./r3_symbols";
// A delay in milliseconds before the scan is run after onLoad, to avoid any
// potential race conditions with other LCP-related functions. This delay
// happens outside of the main JavaScript execution and will only effect the timing
// on when the warning becomes visible in the console.
const SCAN_DELAY = 200;
const OVERSIZED_IMAGE_TOLERANCE = 1200;
export class ImagePerformanceWarning {
    constructor() {
        // Map of full image URLs -> original `ngSrc` values.
        this.window = null;
        this.observer = null;
        this.options = inject(IMAGE_CONFIG);
        this.ngZone = inject(NgZone);
    }
    start() {
        if (typeof PerformanceObserver === 'undefined' ||
            (this.options?.disableImageSizeWarning && this.options?.disableImageLazyLoadWarning)) {
            return;
        }
        this.observer = this.initPerformanceObserver();
        const doc = getDocument();
        const win = doc.defaultView;
        if (typeof win !== 'undefined') {
            this.window = win;
            // Wait to avoid race conditions where LCP image triggers
            // load event before it's recorded by the performance observer
            const waitToScan = () => {
                setTimeout(this.scanImages.bind(this), SCAN_DELAY);
            };
            // Angular doesn't have to run change detection whenever any asynchronous tasks are invoked in
            // the scope of this functionality.
            this.ngZone.runOutsideAngular(() => {
                // Consider the case when the application is created and destroyed multiple times.
                // Typically, applications are created instantly once the page is loaded, and the
                // `window.load` listener is always triggered. However, the `window.load` event will never
                // be fired if the page is loaded, and the application is created later. Checking for
                // `readyState` is the easiest way to determine whether the page has been loaded or not.
                if (doc.readyState === 'complete') {
                    waitToScan();
                }
                else {
                    this.window?.addEventListener('load', waitToScan, { once: true });
                }
            });
        }
    }
    ngOnDestroy() {
        this.observer?.disconnect();
    }
    initPerformanceObserver() {
        if (typeof PerformanceObserver === 'undefined') {
            return null;
        }
        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length === 0)
                return;
            // We use the latest entry produced by the `PerformanceObserver` as the best
            // signal on which element is actually an LCP one. As an example, the first image to load on
            // a page, by virtue of being the only thing on the page so far, is often a LCP candidate
            // and gets reported by PerformanceObserver, but isn't necessarily the LCP element.
            const lcpElement = entries[entries.length - 1];
            // Cast to `any` due to missing `element` on the `LargestContentfulPaint` type of entry.
            // See https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint
            const imgSrc = lcpElement.element?.src ?? '';
            // Exclude `data:` and `blob:` URLs, since they are fetched resources.
            if (imgSrc.startsWith('data:') || imgSrc.startsWith('blob:'))
                return;
            this.lcpImageUrl = imgSrc;
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        return observer;
    }
    scanImages() {
        const images = getDocument().querySelectorAll('img');
        let lcpElementFound, lcpElementLoadedCorrectly = false;
        images.forEach(image => {
            if (!this.options?.disableImageSizeWarning) {
                for (const image of images) {
                    // Image elements using the NgOptimizedImage directive are excluded,
                    // as that directive has its own version of this check.
                    if (!image.getAttribute('ng-img') && this.isOversized(image)) {
                        logOversizedImageWarning(image.src);
                    }
                }
            }
            if (!this.options?.disableImageLazyLoadWarning && this.lcpImageUrl) {
                if (image.src === this.lcpImageUrl) {
                    lcpElementFound = true;
                    if (image.loading !== 'lazy' || image.getAttribute('ng-img')) {
                        // This variable is set to true and never goes back to false to account
                        // for the case where multiple images have the same src url, and some
                        // have lazy loading while others don't.
                        // Also ignore NgOptimizedImage because there's a different warning for that.
                        lcpElementLoadedCorrectly = true;
                    }
                }
            }
        });
        if (lcpElementFound && !lcpElementLoadedCorrectly && this.lcpImageUrl &&
            !this.options?.disableImageLazyLoadWarning) {
            logLazyLCPWarning(this.lcpImageUrl);
        }
    }
    isOversized(image) {
        if (!this.window) {
            return false;
        }
        const computedStyle = this.window.getComputedStyle(image);
        let renderedWidth = parseFloat(computedStyle.getPropertyValue('width'));
        let renderedHeight = parseFloat(computedStyle.getPropertyValue('height'));
        const boxSizing = computedStyle.getPropertyValue('box-sizing');
        const objectFit = computedStyle.getPropertyValue('object-fit');
        if (objectFit === `cover`) {
            // Object fit cover may indicate a use case such as a sprite sheet where
            // this warning does not apply.
            return false;
        }
        if (boxSizing === 'border-box') {
            const paddingTop = computedStyle.getPropertyValue('padding-top');
            const paddingRight = computedStyle.getPropertyValue('padding-right');
            const paddingBottom = computedStyle.getPropertyValue('padding-bottom');
            const paddingLeft = computedStyle.getPropertyValue('padding-left');
            renderedWidth -= parseFloat(paddingRight) + parseFloat(paddingLeft);
            renderedHeight -= parseFloat(paddingTop) + parseFloat(paddingBottom);
        }
        const intrinsicWidth = image.naturalWidth;
        const intrinsicHeight = image.naturalHeight;
        const recommendedWidth = this.window.devicePixelRatio * renderedWidth;
        const recommendedHeight = this.window.devicePixelRatio * renderedHeight;
        const oversizedWidth = (intrinsicWidth - recommendedWidth) >= OVERSIZED_IMAGE_TOLERANCE;
        const oversizedHeight = (intrinsicHeight - recommendedHeight) >= OVERSIZED_IMAGE_TOLERANCE;
        return oversizedWidth || oversizedHeight;
    }
    static { this.ɵfac = function ImagePerformanceWarning_Factory(t) { return new (t || ImagePerformanceWarning)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ImagePerformanceWarning, factory: ImagePerformanceWarning.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(ImagePerformanceWarning, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
function logLazyLCPWarning(src) {
    console.warn(formatRuntimeError(-913 /* RuntimeErrorCode.IMAGE_PERFORMANCE_WARNING */, `An image with src ${src} is the Largest Contentful Paint (LCP) element ` +
        `but was given a "loading" value of "lazy", which can negatively impact ` +
        `application loading performance. This warning can be addressed by ` +
        `changing the loading value of the LCP image to "eager", or by using the ` +
        `NgOptimizedImage directive's prioritization utilities. For more ` +
        `information about addressing or disabling this warning, see ` +
        `https://angular.io/errors/NG0913`));
}
function logOversizedImageWarning(src) {
    console.warn(formatRuntimeError(-913 /* RuntimeErrorCode.IMAGE_PERFORMANCE_WARNING */, `An image with src ${src} has intrinsic file dimensions much larger than its ` +
        `rendered size. This can negatively impact application loading performance. ` +
        `For more information about addressing or disabling this warning, see ` +
        `https://angular.io/errors/NG0913`));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VfcGVyZm9ybWFuY2Vfd2FybmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2ltYWdlX3BlcmZvcm1hbmNlX3dhcm5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxrQkFBa0IsRUFBbUIsTUFBTSxVQUFVLENBQUM7QUFFOUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxRQUFRLENBQUM7O0FBRTlCLDRFQUE0RTtBQUM1RSx5RUFBeUU7QUFDekUsbUZBQW1GO0FBQ25GLHNEQUFzRDtBQUN0RCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFFdkIsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUM7QUFHdkMsTUFBTSxPQUFPLHVCQUF1QjtJQURwQztRQUVFLHFEQUFxRDtRQUM3QyxXQUFNLEdBQWdCLElBQUksQ0FBQztRQUMzQixhQUFRLEdBQTZCLElBQUksQ0FBQztRQUMxQyxZQUFPLEdBQWdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBa0lqQztJQS9IUSxLQUFLO1FBQ1YsSUFBSSxPQUFPLG1CQUFtQixLQUFLLFdBQVc7WUFDMUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHVCQUF1QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsMkJBQTJCLENBQUMsRUFBRSxDQUFDO1lBQ3pGLE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUMxQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEIseURBQXlEO1lBQ3pELDhEQUE4RDtZQUM5RCxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7Z0JBQ3RCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUM7WUFDRiw4RkFBOEY7WUFDOUYsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxrRkFBa0Y7Z0JBQ2xGLGlGQUFpRjtnQkFDakYsMEZBQTBGO2dCQUMxRixxRkFBcUY7Z0JBQ3JGLHdGQUF3RjtnQkFDeEYsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxDQUFDO29CQUNsQyxVQUFVLEVBQUUsQ0FBQztnQkFDZixDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLHVCQUF1QjtRQUM3QixJQUFJLE9BQU8sbUJBQW1CLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3JELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFBRSxPQUFPO1lBQ2pDLDRFQUE0RTtZQUM1RSw0RkFBNEY7WUFDNUYseUZBQXlGO1lBQ3pGLG1GQUFtRjtZQUNuRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUvQyx3RkFBd0Y7WUFDeEYsOEVBQThFO1lBQzlFLE1BQU0sTUFBTSxHQUFJLFVBQWtCLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFFdEQsc0VBQXNFO1lBQ3RFLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFBRSxPQUFPO1lBQ3JFLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNyRSxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sVUFBVTtRQUNoQixNQUFNLE1BQU0sR0FBRyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLGVBQWUsRUFBRSx5QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO2dCQUMzQyxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUMzQixvRUFBb0U7b0JBQ3BFLHVEQUF1RDtvQkFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUM3RCx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RDLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25FLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25DLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUM3RCx1RUFBdUU7d0JBQ3ZFLHFFQUFxRTt3QkFDckUsd0NBQXdDO3dCQUN4Qyw2RUFBNkU7d0JBQzdFLHlCQUF5QixHQUFHLElBQUksQ0FBQztvQkFDbkMsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxlQUFlLElBQUksQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMsV0FBVztZQUNqRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztZQUMvQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNILENBQUM7SUFFTyxXQUFXLENBQUMsS0FBdUI7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUUsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUvRCxJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUMxQix3RUFBd0U7WUFDeEUsK0JBQStCO1lBQy9CLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELElBQUksU0FBUyxLQUFLLFlBQVksRUFBRSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqRSxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckUsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkUsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25FLGFBQWEsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BFLGNBQWMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzFDLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFFNUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUN0RSxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDO1FBQ3hFLE1BQU0sY0FBYyxHQUFHLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDLElBQUkseUJBQXlCLENBQUM7UUFDeEYsTUFBTSxlQUFlLEdBQUcsQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsSUFBSSx5QkFBeUIsQ0FBQztRQUMzRixPQUFPLGNBQWMsSUFBSSxlQUFlLENBQUM7SUFDM0MsQ0FBQzt3RkF0SVUsdUJBQXVCO3VFQUF2Qix1QkFBdUIsV0FBdkIsdUJBQXVCLG1CQURYLE1BQU07O2dGQUNsQix1QkFBdUI7Y0FEbkMsVUFBVTtlQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUEwSWhDLFNBQVMsaUJBQWlCLENBQUMsR0FBVztJQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQix3REFFM0IscUJBQXFCLEdBQUcsaURBQWlEO1FBQ3JFLHlFQUF5RTtRQUN6RSxvRUFBb0U7UUFDcEUsMEVBQTBFO1FBQzFFLGtFQUFrRTtRQUNsRSw4REFBOEQ7UUFDOUQsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFDLEdBQVc7SUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0Isd0RBRTNCLHFCQUFxQixHQUFHLHNEQUFzRDtRQUMxRSw2RUFBNkU7UUFDN0UsdUVBQXVFO1FBQ3ZFLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SU1BR0VfQ09ORklHLCBJbWFnZUNvbmZpZ30gZnJvbSAnLi9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbl90b2tlbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICcuL2RpJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICcuL2RpL2luamVjdG9yX2NvbXBhdGliaWxpdHknO1xuaW1wb3J0IHtmb3JtYXRSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7T25EZXN0cm95fSBmcm9tICcuL2ludGVyZmFjZS9saWZlY3ljbGVfaG9va3MnO1xuaW1wb3J0IHtnZXREb2N1bWVudH0gZnJvbSAnLi9yZW5kZXIzL2ludGVyZmFjZXMvZG9jdW1lbnQnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJy4vem9uZSc7XG5cbi8vIEEgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgc2NhbiBpcyBydW4gYWZ0ZXIgb25Mb2FkLCB0byBhdm9pZCBhbnlcbi8vIHBvdGVudGlhbCByYWNlIGNvbmRpdGlvbnMgd2l0aCBvdGhlciBMQ1AtcmVsYXRlZCBmdW5jdGlvbnMuIFRoaXMgZGVsYXlcbi8vIGhhcHBlbnMgb3V0c2lkZSBvZiB0aGUgbWFpbiBKYXZhU2NyaXB0IGV4ZWN1dGlvbiBhbmQgd2lsbCBvbmx5IGVmZmVjdCB0aGUgdGltaW5nXG4vLyBvbiB3aGVuIHRoZSB3YXJuaW5nIGJlY29tZXMgdmlzaWJsZSBpbiB0aGUgY29uc29sZS5cbmNvbnN0IFNDQU5fREVMQVkgPSAyMDA7XG5cbmNvbnN0IE9WRVJTSVpFRF9JTUFHRV9UT0xFUkFOQ0UgPSAxMjAwO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBJbWFnZVBlcmZvcm1hbmNlV2FybmluZyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIE1hcCBvZiBmdWxsIGltYWdlIFVSTHMgLT4gb3JpZ2luYWwgYG5nU3JjYCB2YWx1ZXMuXG4gIHByaXZhdGUgd2luZG93OiBXaW5kb3d8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb2JzZXJ2ZXI6IFBlcmZvcm1hbmNlT2JzZXJ2ZXJ8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb3B0aW9uczogSW1hZ2VDb25maWcgPSBpbmplY3QoSU1BR0VfQ09ORklHKTtcbiAgcHJpdmF0ZSBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSBsY3BJbWFnZVVybD86IHN0cmluZztcblxuICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgaWYgKHR5cGVvZiBQZXJmb3JtYW5jZU9ic2VydmVyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAodGhpcy5vcHRpb25zPy5kaXNhYmxlSW1hZ2VTaXplV2FybmluZyAmJiB0aGlzLm9wdGlvbnM/LmRpc2FibGVJbWFnZUxhenlMb2FkV2FybmluZykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vYnNlcnZlciA9IHRoaXMuaW5pdFBlcmZvcm1hbmNlT2JzZXJ2ZXIoKTtcbiAgICBjb25zdCBkb2MgPSBnZXREb2N1bWVudCgpO1xuICAgIGNvbnN0IHdpbiA9IGRvYy5kZWZhdWx0VmlldztcbiAgICBpZiAodHlwZW9mIHdpbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMud2luZG93ID0gd2luO1xuICAgICAgLy8gV2FpdCB0byBhdm9pZCByYWNlIGNvbmRpdGlvbnMgd2hlcmUgTENQIGltYWdlIHRyaWdnZXJzXG4gICAgICAvLyBsb2FkIGV2ZW50IGJlZm9yZSBpdCdzIHJlY29yZGVkIGJ5IHRoZSBwZXJmb3JtYW5jZSBvYnNlcnZlclxuICAgICAgY29uc3Qgd2FpdFRvU2NhbiA9ICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnNjYW5JbWFnZXMuYmluZCh0aGlzKSwgU0NBTl9ERUxBWSk7XG4gICAgICB9O1xuICAgICAgLy8gQW5ndWxhciBkb2Vzbid0IGhhdmUgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24gd2hlbmV2ZXIgYW55IGFzeW5jaHJvbm91cyB0YXNrcyBhcmUgaW52b2tlZCBpblxuICAgICAgLy8gdGhlIHNjb3BlIG9mIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgLy8gQ29uc2lkZXIgdGhlIGNhc2Ugd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgY3JlYXRlZCBhbmQgZGVzdHJveWVkIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAvLyBUeXBpY2FsbHksIGFwcGxpY2F0aW9ucyBhcmUgY3JlYXRlZCBpbnN0YW50bHkgb25jZSB0aGUgcGFnZSBpcyBsb2FkZWQsIGFuZCB0aGVcbiAgICAgICAgLy8gYHdpbmRvdy5sb2FkYCBsaXN0ZW5lciBpcyBhbHdheXMgdHJpZ2dlcmVkLiBIb3dldmVyLCB0aGUgYHdpbmRvdy5sb2FkYCBldmVudCB3aWxsIG5ldmVyXG4gICAgICAgIC8vIGJlIGZpcmVkIGlmIHRoZSBwYWdlIGlzIGxvYWRlZCwgYW5kIHRoZSBhcHBsaWNhdGlvbiBpcyBjcmVhdGVkIGxhdGVyLiBDaGVja2luZyBmb3JcbiAgICAgICAgLy8gYHJlYWR5U3RhdGVgIGlzIHRoZSBlYXNpZXN0IHdheSB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgcGFnZSBoYXMgYmVlbiBsb2FkZWQgb3Igbm90LlxuICAgICAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICB3YWl0VG9TY2FuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy53aW5kb3c/LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB3YWl0VG9TY2FuLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQZXJmb3JtYW5jZU9ic2VydmVyKCk6IFBlcmZvcm1hbmNlT2JzZXJ2ZXJ8bnVsbCB7XG4gICAgaWYgKHR5cGVvZiBQZXJmb3JtYW5jZU9ic2VydmVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFBlcmZvcm1hbmNlT2JzZXJ2ZXIoKGVudHJ5TGlzdCkgPT4ge1xuICAgICAgY29uc3QgZW50cmllcyA9IGVudHJ5TGlzdC5nZXRFbnRyaWVzKCk7XG4gICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIC8vIFdlIHVzZSB0aGUgbGF0ZXN0IGVudHJ5IHByb2R1Y2VkIGJ5IHRoZSBgUGVyZm9ybWFuY2VPYnNlcnZlcmAgYXMgdGhlIGJlc3RcbiAgICAgIC8vIHNpZ25hbCBvbiB3aGljaCBlbGVtZW50IGlzIGFjdHVhbGx5IGFuIExDUCBvbmUuIEFzIGFuIGV4YW1wbGUsIHRoZSBmaXJzdCBpbWFnZSB0byBsb2FkIG9uXG4gICAgICAvLyBhIHBhZ2UsIGJ5IHZpcnR1ZSBvZiBiZWluZyB0aGUgb25seSB0aGluZyBvbiB0aGUgcGFnZSBzbyBmYXIsIGlzIG9mdGVuIGEgTENQIGNhbmRpZGF0ZVxuICAgICAgLy8gYW5kIGdldHMgcmVwb3J0ZWQgYnkgUGVyZm9ybWFuY2VPYnNlcnZlciwgYnV0IGlzbid0IG5lY2Vzc2FyaWx5IHRoZSBMQ1AgZWxlbWVudC5cbiAgICAgIGNvbnN0IGxjcEVsZW1lbnQgPSBlbnRyaWVzW2VudHJpZXMubGVuZ3RoIC0gMV07XG5cbiAgICAgIC8vIENhc3QgdG8gYGFueWAgZHVlIHRvIG1pc3NpbmcgYGVsZW1lbnRgIG9uIHRoZSBgTGFyZ2VzdENvbnRlbnRmdWxQYWludGAgdHlwZSBvZiBlbnRyeS5cbiAgICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTGFyZ2VzdENvbnRlbnRmdWxQYWludFxuICAgICAgY29uc3QgaW1nU3JjID0gKGxjcEVsZW1lbnQgYXMgYW55KS5lbGVtZW50Py5zcmMgPz8gJyc7XG5cbiAgICAgIC8vIEV4Y2x1ZGUgYGRhdGE6YCBhbmQgYGJsb2I6YCBVUkxzLCBzaW5jZSB0aGV5IGFyZSBmZXRjaGVkIHJlc291cmNlcy5cbiAgICAgIGlmIChpbWdTcmMuc3RhcnRzV2l0aCgnZGF0YTonKSB8fCBpbWdTcmMuc3RhcnRzV2l0aCgnYmxvYjonKSkgcmV0dXJuO1xuICAgICAgdGhpcy5sY3BJbWFnZVVybCA9IGltZ1NyYztcbiAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHt0eXBlOiAnbGFyZ2VzdC1jb250ZW50ZnVsLXBhaW50JywgYnVmZmVyZWQ6IHRydWV9KTtcbiAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gIH1cblxuICBwcml2YXRlIHNjYW5JbWFnZXMoKTogdm9pZCB7XG4gICAgY29uc3QgaW1hZ2VzID0gZ2V0RG9jdW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcbiAgICBsZXQgbGNwRWxlbWVudEZvdW5kLCBsY3BFbGVtZW50TG9hZGVkQ29ycmVjdGx5ID0gZmFsc2U7XG4gICAgaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnM/LmRpc2FibGVJbWFnZVNpemVXYXJuaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgLy8gSW1hZ2UgZWxlbWVudHMgdXNpbmcgdGhlIE5nT3B0aW1pemVkSW1hZ2UgZGlyZWN0aXZlIGFyZSBleGNsdWRlZCxcbiAgICAgICAgICAvLyBhcyB0aGF0IGRpcmVjdGl2ZSBoYXMgaXRzIG93biB2ZXJzaW9uIG9mIHRoaXMgY2hlY2suXG4gICAgICAgICAgaWYgKCFpbWFnZS5nZXRBdHRyaWJ1dGUoJ25nLWltZycpICYmIHRoaXMuaXNPdmVyc2l6ZWQoaW1hZ2UpKSB7XG4gICAgICAgICAgICBsb2dPdmVyc2l6ZWRJbWFnZVdhcm5pbmcoaW1hZ2Uuc3JjKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5vcHRpb25zPy5kaXNhYmxlSW1hZ2VMYXp5TG9hZFdhcm5pbmcgJiYgdGhpcy5sY3BJbWFnZVVybCkge1xuICAgICAgICBpZiAoaW1hZ2Uuc3JjID09PSB0aGlzLmxjcEltYWdlVXJsKSB7XG4gICAgICAgICAgbGNwRWxlbWVudEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoaW1hZ2UubG9hZGluZyAhPT0gJ2xhenknIHx8IGltYWdlLmdldEF0dHJpYnV0ZSgnbmctaW1nJykpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgdmFyaWFibGUgaXMgc2V0IHRvIHRydWUgYW5kIG5ldmVyIGdvZXMgYmFjayB0byBmYWxzZSB0byBhY2NvdW50XG4gICAgICAgICAgICAvLyBmb3IgdGhlIGNhc2Ugd2hlcmUgbXVsdGlwbGUgaW1hZ2VzIGhhdmUgdGhlIHNhbWUgc3JjIHVybCwgYW5kIHNvbWVcbiAgICAgICAgICAgIC8vIGhhdmUgbGF6eSBsb2FkaW5nIHdoaWxlIG90aGVycyBkb24ndC5cbiAgICAgICAgICAgIC8vIEFsc28gaWdub3JlIE5nT3B0aW1pemVkSW1hZ2UgYmVjYXVzZSB0aGVyZSdzIGEgZGlmZmVyZW50IHdhcm5pbmcgZm9yIHRoYXQuXG4gICAgICAgICAgICBsY3BFbGVtZW50TG9hZGVkQ29ycmVjdGx5ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAobGNwRWxlbWVudEZvdW5kICYmICFsY3BFbGVtZW50TG9hZGVkQ29ycmVjdGx5ICYmIHRoaXMubGNwSW1hZ2VVcmwgJiZcbiAgICAgICAgIXRoaXMub3B0aW9ucz8uZGlzYWJsZUltYWdlTGF6eUxvYWRXYXJuaW5nKSB7XG4gICAgICBsb2dMYXp5TENQV2FybmluZyh0aGlzLmxjcEltYWdlVXJsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzT3ZlcnNpemVkKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLndpbmRvdykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gdGhpcy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbWFnZSk7XG4gICAgbGV0IHJlbmRlcmVkV2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSk7XG4gICAgbGV0IHJlbmRlcmVkSGVpZ2h0ID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpKTtcbiAgICBjb25zdCBib3hTaXppbmcgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKTtcbiAgICBjb25zdCBvYmplY3RGaXQgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ29iamVjdC1maXQnKTtcblxuICAgIGlmIChvYmplY3RGaXQgPT09IGBjb3ZlcmApIHtcbiAgICAgIC8vIE9iamVjdCBmaXQgY292ZXIgbWF5IGluZGljYXRlIGEgdXNlIGNhc2Ugc3VjaCBhcyBhIHNwcml0ZSBzaGVldCB3aGVyZVxuICAgICAgLy8gdGhpcyB3YXJuaW5nIGRvZXMgbm90IGFwcGx5LlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKTtcbiAgICAgIGNvbnN0IHBhZGRpbmdSaWdodCA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1yaWdodCcpO1xuICAgICAgY29uc3QgcGFkZGluZ0JvdHRvbSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKTtcbiAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0ID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKTtcbiAgICAgIHJlbmRlcmVkV2lkdGggLT0gcGFyc2VGbG9hdChwYWRkaW5nUmlnaHQpICsgcGFyc2VGbG9hdChwYWRkaW5nTGVmdCk7XG4gICAgICByZW5kZXJlZEhlaWdodCAtPSBwYXJzZUZsb2F0KHBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChwYWRkaW5nQm90dG9tKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRyaW5zaWNXaWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aDtcbiAgICBjb25zdCBpbnRyaW5zaWNIZWlnaHQgPSBpbWFnZS5uYXR1cmFsSGVpZ2h0O1xuXG4gICAgY29uc3QgcmVjb21tZW5kZWRXaWR0aCA9IHRoaXMud2luZG93LmRldmljZVBpeGVsUmF0aW8gKiByZW5kZXJlZFdpZHRoO1xuICAgIGNvbnN0IHJlY29tbWVuZGVkSGVpZ2h0ID0gdGhpcy53aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAqIHJlbmRlcmVkSGVpZ2h0O1xuICAgIGNvbnN0IG92ZXJzaXplZFdpZHRoID0gKGludHJpbnNpY1dpZHRoIC0gcmVjb21tZW5kZWRXaWR0aCkgPj0gT1ZFUlNJWkVEX0lNQUdFX1RPTEVSQU5DRTtcbiAgICBjb25zdCBvdmVyc2l6ZWRIZWlnaHQgPSAoaW50cmluc2ljSGVpZ2h0IC0gcmVjb21tZW5kZWRIZWlnaHQpID49IE9WRVJTSVpFRF9JTUFHRV9UT0xFUkFOQ0U7XG4gICAgcmV0dXJuIG92ZXJzaXplZFdpZHRoIHx8IG92ZXJzaXplZEhlaWdodDtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dMYXp5TENQV2FybmluZyhzcmM6IHN0cmluZykge1xuICBjb25zb2xlLndhcm4oZm9ybWF0UnVudGltZUVycm9yKFxuICAgICAgUnVudGltZUVycm9yQ29kZS5JTUFHRV9QRVJGT1JNQU5DRV9XQVJOSU5HLFxuICAgICAgYEFuIGltYWdlIHdpdGggc3JjICR7c3JjfSBpcyB0aGUgTGFyZ2VzdCBDb250ZW50ZnVsIFBhaW50IChMQ1ApIGVsZW1lbnQgYCArXG4gICAgICAgICAgYGJ1dCB3YXMgZ2l2ZW4gYSBcImxvYWRpbmdcIiB2YWx1ZSBvZiBcImxhenlcIiwgd2hpY2ggY2FuIG5lZ2F0aXZlbHkgaW1wYWN0IGAgK1xuICAgICAgICAgIGBhcHBsaWNhdGlvbiBsb2FkaW5nIHBlcmZvcm1hbmNlLiBUaGlzIHdhcm5pbmcgY2FuIGJlIGFkZHJlc3NlZCBieSBgICtcbiAgICAgICAgICBgY2hhbmdpbmcgdGhlIGxvYWRpbmcgdmFsdWUgb2YgdGhlIExDUCBpbWFnZSB0byBcImVhZ2VyXCIsIG9yIGJ5IHVzaW5nIHRoZSBgICtcbiAgICAgICAgICBgTmdPcHRpbWl6ZWRJbWFnZSBkaXJlY3RpdmUncyBwcmlvcml0aXphdGlvbiB1dGlsaXRpZXMuIEZvciBtb3JlIGAgK1xuICAgICAgICAgIGBpbmZvcm1hdGlvbiBhYm91dCBhZGRyZXNzaW5nIG9yIGRpc2FibGluZyB0aGlzIHdhcm5pbmcsIHNlZSBgICtcbiAgICAgICAgICBgaHR0cHM6Ly9hbmd1bGFyLmlvL2Vycm9ycy9ORzA5MTNgKSk7XG59XG5cbmZ1bmN0aW9uIGxvZ092ZXJzaXplZEltYWdlV2FybmluZyhzcmM6IHN0cmluZykge1xuICBjb25zb2xlLndhcm4oZm9ybWF0UnVudGltZUVycm9yKFxuICAgICAgUnVudGltZUVycm9yQ29kZS5JTUFHRV9QRVJGT1JNQU5DRV9XQVJOSU5HLFxuICAgICAgYEFuIGltYWdlIHdpdGggc3JjICR7c3JjfSBoYXMgaW50cmluc2ljIGZpbGUgZGltZW5zaW9ucyBtdWNoIGxhcmdlciB0aGFuIGl0cyBgICtcbiAgICAgICAgICBgcmVuZGVyZWQgc2l6ZS4gVGhpcyBjYW4gbmVnYXRpdmVseSBpbXBhY3QgYXBwbGljYXRpb24gbG9hZGluZyBwZXJmb3JtYW5jZS4gYCArXG4gICAgICAgICAgYEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGFkZHJlc3Npbmcgb3IgZGlzYWJsaW5nIHRoaXMgd2FybmluZywgc2VlIGAgK1xuICAgICAgICAgIGBodHRwczovL2FuZ3VsYXIuaW8vZXJyb3JzL05HMDkxM2ApKTtcbn1cbiJdfQ==