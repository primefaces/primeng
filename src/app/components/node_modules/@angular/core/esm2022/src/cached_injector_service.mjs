/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵɵdefineInjectable as defineInjectable } from './di/interface/defs';
import { createEnvironmentInjector } from './render3/ng_module_ref';
/**
 * A service used by the framework to create and cache injector instances.
 *
 * This service is used to create a single injector instance for each defer
 * block definition, to avoid creating an injector for each defer block instance
 * of a certain type.
 */
export class CachedInjectorService {
    constructor() {
        this.cachedInjectors = new Map();
    }
    getOrCreateInjector(key, parentInjector, providers, debugName) {
        if (!this.cachedInjectors.has(key)) {
            const injector = providers.length > 0 ?
                createEnvironmentInjector(providers, parentInjector, debugName) :
                null;
            this.cachedInjectors.set(key, injector);
        }
        return this.cachedInjectors.get(key);
    }
    ngOnDestroy() {
        try {
            for (const injector of this.cachedInjectors.values()) {
                if (injector !== null) {
                    injector.destroy();
                }
            }
        }
        finally {
            this.cachedInjectors.clear();
        }
    }
    /** @nocollapse */
    static { this.ɵprov = defineInjectable({
        token: CachedInjectorService,
        providedIn: 'environment',
        factory: () => new CachedInjectorService(),
    }); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkX2luamVjdG9yX3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9jYWNoZWRfaW5qZWN0b3Jfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsa0JBQWtCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUkzRSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRTs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8scUJBQXFCO0lBQWxDO1FBQ1Usb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBcUMsQ0FBQztJQWdDekUsQ0FBQztJQTlCQyxtQkFBbUIsQ0FDZixHQUFZLEVBQUUsY0FBbUMsRUFBRSxTQUFxQixFQUN4RSxTQUFrQjtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQztZQUNULElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQztZQUNILEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7Z0JBQVMsQ0FBQztZQUNULElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCxrQkFBa0I7YUFDWCxVQUFLLEdBQTZCLGdCQUFnQixDQUFDO1FBQ3hELEtBQUssRUFBRSxxQkFBcUI7UUFDNUIsVUFBVSxFQUFFLGFBQWE7UUFDekIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUkscUJBQXFCLEVBQUU7S0FDM0MsQ0FBQyxBQUpVLENBSVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtcm1ZGVmaW5lSW5qZWN0YWJsZSBhcyBkZWZpbmVJbmplY3RhYmxlfSBmcm9tICcuL2RpL2ludGVyZmFjZS9kZWZzJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJy4vZGkvaW50ZXJmYWNlL3Byb3ZpZGVyJztcbmltcG9ydCB7RW52aXJvbm1lbnRJbmplY3Rvcn0gZnJvbSAnLi9kaS9yM19pbmplY3Rvcic7XG5pbXBvcnQge09uRGVzdHJveX0gZnJvbSAnLi9pbnRlcmZhY2UvbGlmZWN5Y2xlX2hvb2tzJztcbmltcG9ydCB7Y3JlYXRlRW52aXJvbm1lbnRJbmplY3Rvcn0gZnJvbSAnLi9yZW5kZXIzL25nX21vZHVsZV9yZWYnO1xuXG4vKipcbiAqIEEgc2VydmljZSB1c2VkIGJ5IHRoZSBmcmFtZXdvcmsgdG8gY3JlYXRlIGFuZCBjYWNoZSBpbmplY3RvciBpbnN0YW5jZXMuXG4gKlxuICogVGhpcyBzZXJ2aWNlIGlzIHVzZWQgdG8gY3JlYXRlIGEgc2luZ2xlIGluamVjdG9yIGluc3RhbmNlIGZvciBlYWNoIGRlZmVyXG4gKiBibG9jayBkZWZpbml0aW9uLCB0byBhdm9pZCBjcmVhdGluZyBhbiBpbmplY3RvciBmb3IgZWFjaCBkZWZlciBibG9jayBpbnN0YW5jZVxuICogb2YgYSBjZXJ0YWluIHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZWRJbmplY3RvclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGNhY2hlZEluamVjdG9ycyA9IG5ldyBNYXA8dW5rbm93biwgRW52aXJvbm1lbnRJbmplY3RvcnxudWxsPigpO1xuXG4gIGdldE9yQ3JlYXRlSW5qZWN0b3IoXG4gICAgICBrZXk6IHVua25vd24sIHBhcmVudEluamVjdG9yOiBFbnZpcm9ubWVudEluamVjdG9yLCBwcm92aWRlcnM6IFByb3ZpZGVyW10sXG4gICAgICBkZWJ1Z05hbWU/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVkSW5qZWN0b3JzLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCBpbmplY3RvciA9IHByb3ZpZGVycy5sZW5ndGggPiAwID9cbiAgICAgICAgICBjcmVhdGVFbnZpcm9ubWVudEluamVjdG9yKHByb3ZpZGVycywgcGFyZW50SW5qZWN0b3IsIGRlYnVnTmFtZSkgOlxuICAgICAgICAgIG51bGw7XG4gICAgICB0aGlzLmNhY2hlZEluamVjdG9ycy5zZXQoa2V5LCBpbmplY3Rvcik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhY2hlZEluamVjdG9ycy5nZXQoa2V5KSE7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBpbmplY3RvciBvZiB0aGlzLmNhY2hlZEluamVjdG9ycy52YWx1ZXMoKSkge1xuICAgICAgICBpZiAoaW5qZWN0b3IgIT09IG51bGwpIHtcbiAgICAgICAgICBpbmplY3Rvci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5jYWNoZWRJbmplY3RvcnMuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQG5vY29sbGFwc2UgKi9cbiAgc3RhdGljIMm1cHJvdiA9IC8qKiBAcHVyZU9yQnJlYWtNeUNvZGUgKi8gZGVmaW5lSW5qZWN0YWJsZSh7XG4gICAgdG9rZW46IENhY2hlZEluamVjdG9yU2VydmljZSxcbiAgICBwcm92aWRlZEluOiAnZW52aXJvbm1lbnQnLFxuICAgIGZhY3Rvcnk6ICgpID0+IG5ldyBDYWNoZWRJbmplY3RvclNlcnZpY2UoKSxcbiAgfSk7XG59XG4iXX0=